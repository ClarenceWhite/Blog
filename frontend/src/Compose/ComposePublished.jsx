import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Published from "./Published";
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FcDocument, FcHome } from 'react-icons/fc';
import "./ComposePublished.css";
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ComposePublished = () => {

    const [allArticles, setAllArticles] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllArticles();
    })

    const directToDefault = () => {
        navigate("/compose/default")
    }

    const directToDrafts = () =>  {
        navigate("/compose/drafts")
    }    

    async function getAllArticles() {
        let results;
        let url = process.env.REACT_APP_PUBLISHAPI;
        await axios.get(url)
            .then(function (response) {
                let data = response.data;
                results = data;
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
        // change state
        setAllArticles(results);
    }

    function createData(title, date, article_id) {
        return { title, date, article_id };
    }

    const getRows = () => {
        let rows = [];
        let id = 1;
        for (const [key, value] of Object.entries(allArticles)) {
            let utc_date = new Date(value).toUTCString()
            rows.push(createData(key, utc_date, "title" + id++));
        }
        return rows;
    }

    const toEdit = async (event) => {
        // get title clicked
        let title = event.currentTarget.textContent;
        // set  class attribute title
        Published.setTitle(title);
        // call api to set other attribute for next page
        getArticleByTitle(title);
    }

    async function getArticleByTitle(title) {
        let results;
        let url = process.env.REACT_APP_PUBLISHAPI + "/" + title;
        await axios.get(url)
            .then(function (response) {
                let data = response.data;
                results = data;
                console.log(results);
                // change class attribute value
                Published.setContent(results.content);
                Published.setCategory(results.category);
                // redirect
                navigate("/compose/published/edit");
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
    }


    return (
        <div className="compose-published">
              <div className="published-sidebar">
                <ProSidebarProvider>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<FcHome />}
                            onClick={directToDefault}>
                            Default Page
                        </MenuItem>
                        <MenuItem title="Components"
                            icon={<FcDocument />}
                            onClick={directToDrafts}>
                            Drafts List
                        </MenuItem>
                    </Menu>
                </ProSidebarProvider>
            </div>
            <div className="published-list">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="table-header">
                            <TableRow>
                                <StyledTableCell>Article Title</StyledTableCell>
                                <StyledTableCell align="right">Published Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getRows().map((row) => (
                                <StyledTableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className="table-rows"
                                >
                                    <StyledTableCell component="th" scope="row" id={row.article_id} onClick={toEdit}>
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="right">
                                        {row.date}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ComposePublished;