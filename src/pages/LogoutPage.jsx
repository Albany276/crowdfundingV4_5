import React from 'react';
import '../components/ProjectCard/ProjectCard.css';






function LogoutPage() {

    sessionStorage.clear();

    return (
       
        <div className="single-project">
             <h1>You have been logged out</h1>
        
        </div>

    );
}

export default LogoutPage;


