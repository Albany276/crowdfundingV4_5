import React, { useState, useEffect } from 'react';
import UpdateProjectForm from "../components/UpdateProjectForm/UpdateProjectForm"
import { useParams } from "react-router-dom" ;

function UpdateProjectPage() {

    const { id } = useParams();


    return(
        
        <UpdateProjectForm id={id}/>
   

    )

}



export default UpdateProjectPage;