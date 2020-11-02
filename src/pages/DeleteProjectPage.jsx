import React, { useState, useEffect } from 'react';
import DeleteProject from '../components/DeleteProject/DeleteProject';
import { useParams } from "react-router-dom" ;

function DeleteProjectPage() {
    const { id } = useParams();
    return (
        <div>
            <DeleteProject id={id}/>
        </div>
    )
}

export default DeleteProjectPage;