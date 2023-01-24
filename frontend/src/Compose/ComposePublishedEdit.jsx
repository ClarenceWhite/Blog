import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize"; // this is for security
import axios from 'axios';
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import MDEditor from '@uiw/react-md-editor';
import Button from '@mui/material/Button';
import Published from './Published';
import "./ComposePublishedEdit.css";
import { FcDocument } from 'react-icons/fc';
import Alert from '@mui/material/Alert';

// sleep function
const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const ComposePublishedEdit = () => {

    const old_title = Published.getTitle();
    const navigate = useNavigate();
    const [title, setTitle] = useState(Published.getTitle());
    const [content, setContent] = useState(Published.getContent());
    const [category, setCategory] = useState(Published.getCategory());
    const [republish_hint, setRepublish_hint] = useState("");
    const [delete_hint, setDelete_hint] = useState("");
    const [is_republished, setIs_republished] = useState("");
    const [is_deleted, setIs_deleted] = useState("");
    let date = new Date();

    const toPublished = () => {
        navigate("/compose/published");
    }

    const handleUpdateTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleUpdateCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleRepublish = async () => {
        republish();
    }

    const handleDelete = async () => {
        delete_article(old_title);
        await sleep(1000);
        navigate("/compose/published");
    }

    async function republish() {
        let url = process.env.REACT_APP_PUBLISHAPI + "/" + old_title;
        let hint;
        let status;
        await axios.put(url,
            {
                title: title,
                content: content,
                publish_date: date,
                category: category
            })
            .then(function (response) {
                console.log("Response from update draft api:\n", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setIs_republished("success");
                    setRepublish_hint(hint);
                } else {
                    setIs_republished("error");
                    setRepublish_hint(hint);
                }
            })
            .catch(function (error) {
                console.log("Error from update draft api:\n", error);
                hint = error.response.data;
                setRepublish_hint(hint);
                setIs_republished("error");
            });
    }

    async function delete_article(title) {
        let url = process.env.REACT_APP_PUBLISHAPI + "/" + title;
        let hint;
        let status;
        await axios.delete(url)
            .then(function (response) {
                console.log("response from delete API:", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setDelete_hint(hint);
                    setIs_deleted("success");
                } else {
                    setDelete_hint(hint);
                    setIs_deleted("error");
                }
            })
            .catch(function (error) {
                console.log("axios error:\n", error);
                hint = error.response.data;
                setDelete_hint(hint);
                setIs_deleted("error");
            })
    }


    return (
        <div className='published-edit'>
            <div className="published-edit-sidebar">
                <ProSidebarProvider>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<FcDocument />}
                            onClick={toPublished}
                        >
                            Published List
                        </MenuItem>
                    </Menu>
                </ProSidebarProvider>
                <div className="edit-options">
                    <div className="input-title">
                        <label>Update Title</label>
                        <input type="text" name="title" onChange={handleUpdateTitle} value={title} />
                    </div>
                    <div className="category-dropdown">
                        <label>Update Category</label>
                        <select
                            value={category}
                            onChange={handleUpdateCategory}
                        >
                            <option value="">
                            </option>
                            <option value="reading">
                                Reading
                            </option>
                            <option value="music">
                                Music
                            </option>
                            <option value="tech">
                                Tech
                            </option>
                        </select>
                    </div>
                    <Button
                        size="medium"
                        variant="contained"
                        color="secondary"
                        onClick={handleRepublish}
                    >
                        Republish Article
                    </Button>
                    <div className="update-hint">
                        <Alert severity={is_republished}>{republish_hint}</Alert>
                    </div>
                    <Button
                        size="medium"
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete Article
                    </Button>
                    <div className="delete-hint">
                        <Alert severity={is_deleted}>{delete_hint}</Alert>
                    </div>
                </div>
            </div>
            <MDEditor
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                value={content}
                onChange={setContent}
                className="md-container"
            />
        </div>
    )
}

export default ComposePublishedEdit;