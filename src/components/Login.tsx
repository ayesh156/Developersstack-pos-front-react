import AxiosInstance from "../config/axiosInstance.ts";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login= async ()=>{
        try {

            const response = await AxiosInstance.post('/users/login', {
                email,  password,
            });

            //=====================
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate()+2);

            const cookieValue = encodeURIComponent('token')+'='
                +encodeURIComponent(response.data)+'; expires='+expirationDate.toUTCString()+'; path=/';

            document.cookie = cookieValue;
            
            setEmail('');
            setPassword('');

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email here" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password here" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary col-12 mt-3" onClick={login}>Login</button>
                        <Link to="/signup" className="btn btn-outline-dark col-12 mt-4">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;