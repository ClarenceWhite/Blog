import React, { useState } from "react";
import axios from 'axios';
import "./Compose.css";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";

const Compose = () => {

    // React States
    const [feedback, setFeedback] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
        // console.log("username input is:", event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        // console.log("password input is:", event.target.value);
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        submitForm(username, password);
    };

    function isLogin(feedback) {
        if (feedback === 'OK') {
            // if passed authentication
            Auth.login()
            navigate('/compose/default');
            return true;
        } else {
            return false;
        }
    }

    async function submitForm(username, password) {
        let submitResult = "Are you tring to crack my username and password?🙀🙀";
        let url = process.env.REACT_APP_LOGINAPI;
        // console.log("Calling login api: "+url)
        await axios.get(url, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(function (response) {
                console.log("axios response:\n", response)
                let data = response.data;
                console.log("data from axios response:\n", data);
                submitResult = data;
            })
            .catch(function (error) {
                console.log("axios error:\n", error)
            })
        setFeedback(submitResult);
    }

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" onChange={handleUsername} required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" onChange={handlePassword} required />
                </div>
                <div className="feedback" style={{ color: isLogin(feedback) ? 'green' : 'red' }}>
                    {feedback}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );


    return (
        <div className="compose-auth">
        <div className="login-form">
            <div className="title">Oooops! Only the author can access this function, unless you have cracked the password 🤪🤪</div>
            {renderForm}
        </div>
    </div>
    );

}

export default Compose;
