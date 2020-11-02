import React, { useState, useEffect } from 'react';
import PledgeForm from "../components/PledgeForm/PledgeForm";
import { useParams } from "react-router-dom" ;


function PledgePage() {

    const { id } = useParams();


    return(
        
        <PledgeForm id={id}/>
        

    )

}

export default PledgePage;