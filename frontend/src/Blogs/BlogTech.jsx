import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect } from "react";
import Article from './Article';
import { useNavigate } from "react-router-dom";

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


const BlogTech = () => {

    const navigate = useNavigate();
    const [allArticles, setAllArticles] = useState("Please fetch...");
    useEffect(() => {
        getArticlesByCategory("tech");
    })

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

    async function getArticlesByCategory(category) {
        let url = process.env.REACT_APP_PUBLISHAPI + "/category/" + category;
        let results;
        let status;
        await axios.get(url)
            .then(function (response) {
                results = response.data;
                status = response.status;
                if (status == 200) {
                    setAllArticles(results);
                }
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
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
                Article.setContent(results.content);
                // redirect
                navigate("/blog/view");
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
    }

    const toView = (event) => {
        // get title clicked
        let title = event.currentTarget.textContent;
        // set  class attribute title
        Article.setTitle(title);
        // call api to set other attributes for next page
        getArticleByTitle(title);
    }


    return (
        <div className="blog-tech">
            <div className="tech-list">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="table-header">
                            <TableRow>
                                <StyledTableCell>Article</StyledTableCell>
                                <StyledTableCell align="right">Last Updated</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getRows().map((row) => (
                                <StyledTableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className="table-rows"
                                >
                                    <StyledTableCell component="th" scope="row" id={row.draft_id} onClick={toView}>
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

export default BlogTech;