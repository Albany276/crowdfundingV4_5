import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../ProjectCard/ProjectCard.css'

function DeleteProject(props){
    const { id } = props;
    const history = useHistory();

    const deleteData = async() => {
        const token =  window.sessionStorage.getItem("token");
       

        if (!token){
            window.alert("You need to be logged in to update a project")
            return
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/projects/${id}`,{
            method: "delete",
            // the headers pass info to the request
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            // body: JSON.stringify(projectData)
            });
            return response;       
    }

    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        deleteData().then((response) => {
            console.log(response.status)

            if (response.status == 403) {
                window.alert("You are not the owner of this project, so you can't delete it")
                history.push("/");         
            }

            if (response.status == 204) {
                window.alert("Delete successful.")
                history.push("/");         
            }


            
                }
            );
    };

    return (
            <div className="single-project-box">
                <h3>    Are you sure you want to delete the project?</h3>
                <div class="form-item">   
                    <button type="submit" onClick={handleSubmit}>
                        Delete project
                    </button>
                </div>
            </div>
      

    )
}

export default DeleteProject;