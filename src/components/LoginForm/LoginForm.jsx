import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginForm(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();

    const handleChange =(e) => {
        const { id,value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }))
    };


    const postData = async() => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api-token-auth/`,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
            });
            return response.json();       
    }

    // the below checks that both a username and password have been entered in the front end
    // before contacting the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password){
            postData().then((response) => {
                console.log(response)
                // if username and password are correct as per the database, then the response will have the auth token
                //if the username and password are not correct as per the database, then the response will not have a token and we will print a window alert
                if (response.token){
                    window.sessionStorage.setItem("token", response.token);
                    window.sessionStorage.setItem("user_id", response.id);
                    // const aux = "User logged in"
                    history.push("/");

                } 
                else {
                    window.alert("Username and/or password are incorrect")
                    // console.log("False")
                }
               
              

            });
        };
    };


    return (
        <form>
            <div class="logform-item">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
            </div>
            <div class="logform-item">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <div class="logform-item">
                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </form>

    )
}

export default LoginForm