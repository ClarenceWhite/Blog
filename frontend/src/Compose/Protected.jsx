import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Auth";

const Protected = ({children}) => {
    let authed = Auth.isAuthenticated();
    console.log("From Protected component 0:", authed);
    // if is not authenticated, navigate to compose login page
    if (!authed) {
        console.log("From Protected component c1:", authed);
        return <Navigate to="/compose" replace/>
    } 
    // if is authenticated, go to /compose/default page
    else {
        console.log("From Protected component c2:", authed);
        return children;
    }
};
export default Protected;