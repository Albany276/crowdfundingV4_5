import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./UpdateProjectForm.css"

// 01/11: update project

function UpdateProjectForm(props){
    const { id } = props;
    const history = useHistory();

    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data)
        });
    }, []);


    const handleChange =(e) => {
        const { id,value } = e.target;
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
        }))
    };


    const putData = async() => {
        const token =  window.sessionStorage.getItem("token");
       

        if (!token){
            window.alert("You need to be logged in to update a project")
            return
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/projects/${id}`,{
            method: "put",
            // the headers pass info to the request
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(projectData)
            });
            return response;       
    }

    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        putData().then((response) => {
            console.log(response)
            console.log("status")
            console.log(response.status)

            if (response.status == 403) {
                window.alert("You are not the owner of this project, so you can't update it")
                history.push("/");         
            }
            
            if (response.status == 200){
                window.alert("Project updated successfully")
            }

            history.push(`/projects/${id}`);


                }
            );

        
        
      
    };


    return (
        <form>
            <h2>What project fields do you want to update?</h2>
            <div class="form-item">              
                
                <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder={projectData.title}
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder={projectData.description}
                    onChange={handleChange}
                />
            </div>

            <div class="form-item">
                <label htmlFor="goal">Goal:</label>
                <input
                    type="integer"
                    id="goal"
                    placeholder={projectData.goal}
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="is_open">Is the Project open?:</label>
                <input
                    type="boolean"
                    id="is_open"
                    placeholder={projectData.is_open}
                    onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="image">Enter an image for your project:</label>
                <input
                    type="URL"
                    id="image"
                    placeholder={projectData.image}
                    onChange={handleChange}
                />
            </div>

            <div class="form-item">
                <label htmlFor="country">Which Country is the project at?</label>
                <input
                    type="text"
                    id="country"
                    placeholder={projectData.country}
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
                    Update project
                </button>
            </div>
        </form>

    )
}

export default UpdateProjectForm;