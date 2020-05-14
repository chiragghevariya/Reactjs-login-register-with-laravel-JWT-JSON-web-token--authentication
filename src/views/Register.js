import React, { useState } from "react";
import axios from "axios";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleInputChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        if(name == 'name'){

            setName(value);
        
        }else if(name == 'email'){

            setEmail(value);

        }else if(name == 'password'){

            setPassword(value);
        }
    }

    const handleSubmiitChange  = (event) =>{
        
        event.preventDefault();
        console.log(name,email,password);
        const data = {
             name:name,
             email:email,
             password:password
         };

        axios.post('http://localhost/laravel-jwt-auth/api/api-user-registration',data)
         .then((response) => {
           setEmail('');
           setName('');
           setPassword('');
           toast.success("Thank you for register !", {
            position: toast.POSITION.TOP_CENTER
          });

        }).catch(error => { 
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }
    
    return (
        <div className="jumbotron">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h3>Register</h3>
                    <form onSubmit={handleSubmiitChange} >
                        <div className="form-group">
                            <label htmlFor="exampleInpuName1">Name</label>
                            <input type="text" value={name} onChange={handleInputChange} name="name" className="form-control" id="exampleInpuName1" aria-describedby="emailHelp" placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" value={email} name="email" onChange={handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={password} name="password" onChange={handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>       
            <ToastContainer />
        </div>
    );
}

export default Register;