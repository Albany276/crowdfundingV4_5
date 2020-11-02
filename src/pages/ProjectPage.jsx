import React,  { useState, useEffect } from 'react';
// import { oneProject } from "../data";
import { useParams } from "react-router-dom" ;
import { Link } from 'react-router-dom';
// the above allows us to dynamically set the url 
import ProjectCard from "../components/ProjectCard/ProjectCard";

function ProjectPage() {
    const [projectData, setProjectData] = useState ({ pledges: [] });
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data)
        });
    }, []);



    return (
        // 20/10: single-project related CSS currently lives in project-card.css
        <div className="single-project">
            <div className="single-project-box">
                <h2>{projectData.title}</h2>
                <img src={projectData.image}/>
                <h3></h3>
                <div className="inner-link-box">
                    <Link className="inner-link" to={`/update/${projectData.id}`}>Update Project</Link>
                    <Link className="inner-link" to={`/pledge/${projectData.id}`}>Pledge to Project</Link>
                    <Link className="inner-link" to={`/deleteproject/${projectData.id}`}>Delete Project</Link>
                    
                </div>
            </div>
            
            <div className="single-project-box">
                <h3>id: {projectData.id}</h3>
                <h3>Owner: {projectData.owner}</h3>
                <h3>Description: {projectData.description}</h3>
                <h3>Country: {projectData.country}</h3>
                <h3>Goal: ${projectData.goal}</h3>
                <h3>{`Status: ${projectData.is_open}`}</h3> 
                {/* using ` to convert is_open from boolean to string - $ indicates that this is a variable */}
                <h3>Created at: {projectData.date_created}</h3>
                <h3>Total Amount Raised: ${projectData.amount_raised}</h3> 
                <h3>Pledges: </h3>
                <ul>
                    {projectData.pledges.map((pledgeData, key) => {
                        return (
                            <li>
                                Pledged Amount: ${pledgeData.amount} 
                                {/* - from Supporter: {pledgeData.supporter} */}
                            </li>

                        )
                    })}
                </ul>
            </div>
        </div>

    );
}


export default ProjectPage;