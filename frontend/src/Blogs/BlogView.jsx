import { Divider } from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown';
import Article from './Article';
import './BlogView.css';

const BlogView = () => {

    const title = Article.getTitle();
    const content = Article.getContent();

    return (
        <div className="article">
            <h1 className="article-title">{title}</h1>
            <Divider className="article-divider">🐾🐾🐾🐾🐾 I am divider 🐾🐾🐾🐾🐾</Divider>
            <ReactMarkdown className="article-content">{content}</ReactMarkdown>
        </div>
    )

}

export default BlogView;