import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../UpdateProjectForm/UpdateProjectForm.css";
// both the project update and the project from (Create) components get the css from the same place


function PledgeForm(props){ 
    const { id } = props;
    const history = useHistory();
    
    const [projectData, setProjectData] = useState({});

    // Getting project info so I can read goal and amount_left, which are used in a window alert message later on
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data)
        });
    }, []);


    const [pledge, setPledge] = useState({
        // if amount is forced below, then the pledge works. But if amount is set at the form, then the API returns an error 500 
        amount: 100, 
        comment: "great",
        anonymous: 1,
        project_id: id,
        // supporter: 1,
      
    });

    const handleChange =(e) => {
        const { id,value } = e.target;
        // parseInt(e.target.value)

        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
        }))
        // console.log("amount")
        // console.log(pledge.amount)
        
        // if (pledge.amount){
        //     pledge.amount = parseInt(pledge.amount)
        //     console.log("monto")
        // }



    };


    const postData = async() => {
        const token =  window.sessionStorage.getItem("token");
        // the below if will return an error if no token is passed - only logged in users can create projects

        if (!token){
            window.alert("You need to be logged in  to pledge to a project")
            return
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/pledges/`,{
            method: "post",
            // the headers pass info to the request
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },

            body: JSON.stringify(pledge)

            // body: JSON.stringify({
            //     "amount": parseInt(pledge.amount)
            // })
           




            });

            return {
                response
                
            }       
    }

    // the below checks that both a username and password have been entered in the front end
    // before contacting the backend
    const handleSubmit = (e) => {
      
        e.preventDefault(); 
        postData().then(({response}) => {  
            console.log(response.status)
            console.log(response)
            window.sessionStorage.setItem("pledgestatus", response.status);    
            
            if (response.status == 403) {
                window.alert("You cant pledge to your own project")
                history.push("/");         
            }

            if (response.status == 423) {
                window.alert("the project is closed and is not accepting more pledges. Try pledging to another project")
                history.push("/");           
            }

            if (response.status == 400) {
                window.alert(`looks like your pledge is surpassing the project goal. The project goal is $${projectData.goal} and the amount raised so far is $${projectData.amount_raised}. Adjust your pledge and try again`)         
                history.push(`/pledge/${id}`);
            }

            if (response.status == 201) {
                window.alert("Pledge successful. Thanks for your support")
                history.push(`/projects/${id}`);         
            }
        }
        );
        // if (pledge.amount){
        //     postData().then((response) => {
        //         console.log(response)
               
        //         }
        //     );
        // };
    };


    return (
        <form>
            <div className="form-item">
                <label htmlFor="amount">Pledge amount:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="$"
                    // parse={value => parseInt(value)}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="comment">Pledge comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder=""
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <label htmlFor="anonymous">Would you like your pledge to be anonymous?:</label>
                <input
                    type="number"
                    id="anonymous"
                    placeholder="Enter 1 for yes, 0 for no"
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <button type="submit" onClick={handleSubmit}>
                    Pledge!
                </button>
            </div>
        </form>

    )
}

export default PledgeForm;