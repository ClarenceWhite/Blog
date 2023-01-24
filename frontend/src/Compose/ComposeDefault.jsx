import React, { useState } from "react";
import axios from 'axios';
import "./ComposeDefault.css";
import { useNavigate } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize"; // this is for security
import { Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FcInspection, FcDocument } from 'react-icons/fc';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const ComposeDefault = () => {

    const [md_content, setMd_content] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [save_hint, setSave_hint] = useState("");
    const [publish_hint, setPublish_hint] = useState("");
    const [is_saved, setIs_saved] = useState("");
    const [is_published, setIs_published] = useState("");
    const navigate = useNavigate();
    let time = new Date().toISOString();

    const directToDrafts = () => {
        navigate("/compose/drafts");
    }

    const directToPublished = () => {
        navigate("/compose/published");
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleSaveDraft = async () => {
        if (title === "" || category === "") {
            setSave_hint("Title and Category should not be null!")
            setIs_saved("warning");
        } else {
            saveDraft();
        }
    }

    const handlePublish = async () => {
        if (title === "" || category === "") {
            setPublish_hint("Title and Category should not be null!")
            setIs_published("warning")
        } else {
            publish();
        }
    }

    //  make  a post request to save current draft
    async function saveDraft() {
        let url = process.env.REACT_APP_DRAFTAPI;
        let hint;
        let status;
        await axios.post(url, {
            title: title,
            content: md_content,
            last_modified: time,
            category: category
        })
            .then(function (response) {
                console.log("Response from save draft api:\n", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setIs_saved("success");
                    setSave_hint(hint);
                } else {
                    setIs_saved("warning");
                    setSave_hint(hint);
                }
            })
            .catch(function (error) {
                console.log("Error from save draft api:\n", error);
                hint = error.response.data;
                setSave_hint(hint);
                setIs_saved("error");
            });
    }

    async function publish() {
        let url = process.env.REACT_APP_PUBLISHAPI;
        let hint;
        let status;
        await axios.post(url, {
            title: title,
            content: md_content,
            publish_date: time,
            category: category
        })
            .then(function (response) {
                console.log("Response from publish api:\n", response);
                hint = response.data;
                status = response.status;
                if (status == 200) {
                    setIs_published("success");
                    setPublish_hint(hint);
                } else {
                    setIs_published("warning");
                    setPublish_hint(hint);
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
        <div className="compose-default">
            <div className="default-sidebar">
                <ProSidebarProvider>
                    <Menu iconShape="square">
                        <MenuItem
                            icon={<FcDocument />}
                            onClick={directToDrafts}>
                            Drafts List
                        </MenuItem>
                        <MenuItem title="Components"
                            icon={<FcInspection />}
                            onClick={directToPublished}>
                            Published List
                        </MenuItem>
                    </Menu>
                </ProSidebarProvider>
                <div className="edit-options">
                    <div className="input-title">
                        <label>Title</label>
                        <input type="text" name="title" required onChange={handleTitle} />
                    </div>
                    <div className="category-dropdown">
                        <label>Category</label>
                        <select
                            defaultValue={category}
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
                        onClick={handleSaveDraft}
                    >
                        Save
                    </Button>
                    <div className="save-hint">
                        <Alert severity={is_saved}>{save_hint}</Alert>
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
                </div>
            </div>
            <MDEditor
                value={md_content}
                onChange={setMd_content}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                className="md-container"
            />
        </div>
    );

}

export default ComposeDefault;