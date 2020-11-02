import React, { useState, useEffect } from 'react';
import { allProjects} from "../data";
import ProjectCard from "../components/ProjectCard/ProjectCard"



function HomePage() {
    const [projectList, setProjectList] = useState([]);
    // above creates empty array at first, and then below will grab info from API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/`).then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectList(data);
        })
        // process.env is a feature that is built in React
    }, []);

    return (
    <div id="project-list">
        {projectList.map((projectData, key) =>{
            return <ProjectCard key={key} projectData={projectData} />

            // react likes to have an individual div per item, that is why we are adding div key={key}, however if we wanted to add css to it, it is better to add a class to that div
        })}
    

    </div>
    
    
    );
}


export default HomePage;