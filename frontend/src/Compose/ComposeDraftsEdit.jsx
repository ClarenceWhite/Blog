import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize"; // this is for security
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FaDraftingCompass } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';
import "./ComposeDraftsEdit.css";
import Button from '@mui/material/Button';
import Draft from './Draft';
import axios from "axios";
import { FcDocument } from 'react-icons/fc';
import Alert from '@mui/material/Alert';

// sleep function
const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const ComposeDraftsEdit = () => {

    const old_title = Draft.getTitle();
    const navigate = useNavigate();
    const [title, setTitle] = useState(Draft.getTitle());
    const [content, setContent] = useState(Draft.getContent());
    const [category, setCategory] = useState(Draft.getCategory());
    const [update_hint, setUpdate_hint] = useState("");
    const [publish_hint, setPublish_hint] = useState("");
    const [delete_hint, setDelete_hint] = useState("");
    const [is_updated, setIs_updated] = useState("");
    const [is_published, setIs_published] = useState("");
    const [is_deleted, setIs_deleted] = useState("");
    let date = new Date();

    const goBackToDrafts = () => {
        navigate("/compose/drafts");
    }

    const handleUpdateTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleUpdateDraft = async () => {
        update_draft();
    }

    const handlePublish = async () => {
        publish();
        await sleep(3000);
        navigate("/compose/drafts");
    }

    const handleDelete = async () => {
        delete_draft(old_title);
        await sleep(1000);
        navigate("/compose/drafts");
    }


    // put request to update draft
    async function update_draft() {
        let url = process.env.REACT_APP_DRAFTAPI + "/" + old_title;
        let hint;
        let status;
        await axios.put(url,
            {
                title: title,
                content: content,
                last_modified: date,
                category: category
            })
            .then(function (response) {
                console.log("Response from update draft api:\n", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setIs_updated("success");
                    setUpdate_hint(hint);
                } else {
                    setIs_updated("error");
                    setUpdate_hint(hint);
                }
            })
            .catch(function (error) {
                console.log("Error from update draft api:\n", error);
                hint = error.response.data;
                setUpdate_hint(hint);
                setIs_updated("error");
            });
    }

    async function delete_draft(title) {
        let url = process.env.REACT_APP_DRAFTAPI + "/" + title;
        let hint;
        let status;
        await axios.delete(url)
            .then(function (response) {
                console.log("response from delete API:", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setIs_deleted("success");
                    setDelete_hint(hint);
                } else {
                    setIs_deleted("error");
                    setDelete_hint(hint);
                }
            })
            .catch(function (error) {
                console.log("axios error:\n", error);
                hint = error.response.data;
                setDelete_hint(hint);
                setIs_deleted("error");
            })
    }

    async function publish() {
        let url = process.env.REACT_APP_PUBLISHAPI;
        let hint;
        let status;
        await axios.post(url, {
            title: title,
            content: content,
            publish_date: date,
            category: category
        })
            .then(function (response) {
                console.log("Response from publish api:\n", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setPublish_hint(hint);
                    setIs_published("success");
                    delete_draft(old_title);
                } else {
                    setPublish_hint(hint);
                    setIs_published("error");
                }
            })
            .catch(function (error) {
                console.log("Error from publish api:\n", error);
                hint = error.response.data;
                setPublish_hint(hint);
                setIs_published("error");
            });
    }


    return (
        <div className="drafts-edit">
            <div className="drafts-edit-sidebar">
                <ProSidebarProvider>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<FcDocument />}
                            onClick={goBackToDrafts}>
                            Drafts List
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
                            onChange={handleCategory}
                            required
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
                        onClick={handleUpdateDraft}
                    >
                        Update Draft
                    </Button>
                    <div className="update-hint">
                        <Alert severity={is_updated}>{update_hint}</Alert>
                    </div>
                    <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={handlePublish}
                    >
                        Publish
                    </Button>
                    <div className="publish-hint">
                        <Alert severity={is_published}>{publish_hint}</Alert>
                    </div>
                    <Button
                        size="medium"
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete Draft
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

export default ComposeDraftsEdit;