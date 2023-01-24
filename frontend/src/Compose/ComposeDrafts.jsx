import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ComposeDrafts.css";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FcHome } from 'react-icons/fc';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Draft from './Draft';
import { FcInspection } from 'react-icons/fc';
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


const ComposeDrafts = () => {

    const navigate = useNavigate();
    const [allTitles, setAllTitles] = useState("Please fetch...");
    useEffect(() => {
        getAllDrafts();
    })

    const directToDefault = () => {
        navigate("/compose/default");
    }

    const directToPublished = () => {
        navigate("/compose/published");
    }

    async function getAllDrafts() {
        let results;
        let url = process.env.REACT_APP_DRAFTAPI;
        await axios.get(url)
            .then(function (response) {
                let data = response.data;
                results = data;
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
        // change state
        setAllTitles(results);
    }

    function createData(title, date, draft_id) {
        return { title, date, draft_id };
    }

    const getRows = () => {
        let rows = [];
        let id = 1;
        for (const [key, value] of Object.entries(allTitles)) {
            let utc_date = new Date(value).toUTCString()
            rows.push(createData(key, utc_date, "title" + id++));
        }
        return rows;
    }

    const toEdit = async (event) => {
        // get title clicked
        let title = event.currentTarget.textContent;
        // set  class attribute title
        Draft.setTitle(title);
        // call api to set other attribute for next page
        getDraftByTitle(title);
    }

    async function getDraftByTitle(title) {
        let results;
        let url = process.env.REACT_APP_DRAFTAPI + "/" + title;
        await axios.get(url)
            .then(function (response) {
                let data = response.data;
                results = data;
                console.log(results);
                // change class attribute value
                Draft.setContent(results.content);
                Draft.setCategory(results.category);
                // redirect
                navigate("/compose/drafts/edit");
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
    }


    return (
        <div className="compose-drafts">
            <div className="drafts-sidebar">
                <ProSidebarProvider>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<FcHome />}
                            onClick={directToDefault}>
                            Default Page
                        </MenuItem>
                        <MenuItem title="Components"
                            icon={<FcInspection />}
                            onClick={directToPublished}>
                            Published List
                        </MenuItem>
                    </Menu>
                </ProSidebarProvider>
            </div>

            <div className="drafts-list">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="table-header">
                            <TableRow>
                                <StyledTableCell>Draft Title</StyledTableCell>
                                <StyledTableCell align="right">Last Modified</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getRows().map((row) => (
                                <StyledTableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className="table-rows"
                                >
                                    <StyledTableCell component="th" scope="row" onClick={toEdit} id={row.draft_id}>
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

export default ComposeDrafts;