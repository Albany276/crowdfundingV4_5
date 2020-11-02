import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../UpdateProjectForm/UpdateProjectForm.css"
// both the project update and the project from (Create) components get the css from the same place


// 24/10: starting project form to create a new project

function ProjectForm(){
    const [info, setInfo] = useState({
        title: "",
        description: "",
        goal: "",
        image: "", 
        is_open: "",
        country:"", 
        date_created: "2020-10-02T20:36:23.382748Z",     
        // 25/10: forcing date - having problem with format if created as label in the form - need to figure it out later on
    });
    const history = useHistory();

    const handleChange =(e) => {
        const { id,value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [id]: value,
        }))
    };


    const postData = async() => {
        const token =  window.sessionStorage.getItem("token");
        // the below if will return an error if no token is passed - only logged in users can create projects

        if (!token){
            window.alert("You need to be logged in  to create a project")
            return
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/projects/`,{
            method: "post",
            // the headers pass info to the request
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(info)
            });
            return response.json();       
    }

    // the below checks that both a username and password have been entered in the front end
    // before contacting the backend
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (info.title && info.description && info.goal){
            postData().then((response) => {
                console.log(response)
               
                }
            );
        };
        history.push("/");
    };


    return (
        <form>
            <div class="form-item">
                <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="description"
                    onChange={handleChange}
                />
            </div>

            <div class="form-item">
                <label htmlFor="goal">Goal:</label>
                <input
                    type="integer"
                    id="goal"
                    placeholder="goal"
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="is_open">Is the Project open?:</label>
                <input
                    type="boolean"
                    id="is_open"
                    placeholder="Enter 1 for open, 0 for closed"
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="image">Enter an image for your project:</label>
                <input
                    type="URL"
                    id="image"
                    placeholder="Enter image URL"
                    onChange={handleChange}
                />
            </div>

            <div class="form-item">
                <label htmlFor="country">Which Country is the project at?</label>
                <input
                    type="text"
                    id="country"
                    placeholder="Enter country"
                    onChange={handleChange}
                />
            </div>
{/* 
            <div>
                <label htmlFor="date">Creation date:</label>
                <input
                    type="text"
                    id="date"
                    placeholder=""
                    onChange={handleChange}
                />
            </div> */}


            <div class="form-item">
                <button type="submit" onClick={handleSubmit}>
                    Create Project
                </button>
            </div>
        </form>

    )
}

export default ProjectForm