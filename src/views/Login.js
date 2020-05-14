import React,{useState} from "react";
import axios from "axios";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleInputChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        if(name == 'email'){

            setEmail(value);

        }else if(name == 'password'){

            setPassword(value);
        }
    }

    const handleSubmiitChange  = (event) =>{
        
        event.preventDefault();
        const data = {
             email:email,
             password:password
         };

        axios.post('http://localhost/laravel-jwt-auth/api/api-user-login',data)
         .then((response) => {

            if(response.data.status == 422){

                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }else if(response.data.status == 200 ){

                console.log(response.data);
                localStorage.setItem('userData', JSON.stringify(response.data.data));
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });

            }else{
                
                toast.error('Something is wrong', {
                    position: toast.POSITION.TOP_CENTER
                });
            }



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
                    <h3>Sign In</h3>
                    <form onSubmit={handleSubmiitChange}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email"  name="email" onChange={handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="password" onChange={handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        
                    </form>
                </div>
            </div>
            <ToastContainer />       
        </div>
    );
}

export default Login;