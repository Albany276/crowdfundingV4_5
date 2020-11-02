import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import "../LoginForm/LoginForm";
import Greeting from "./Greeting";


function Nav(){

    return (

        <nav>
            <div className="topnav">
                <Link className="a" to="/">Home</Link>
                    {/* the to props sets the url */}
                <Link className="a" to="/projects">Projects</Link>

                <div className="topnav-right">  
                    <Greeting/>
                    {/* The greeting component checks if user is logged in, to then show the user profile link,
                        if the user is not logged in, it will then show the log in button */}
                    <Link className="a" to="/createproject">Create Project</Link>
                </div> 
            </div>
        </nav>
  
        
    );
}

export default Nav;