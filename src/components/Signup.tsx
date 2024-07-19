import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../config/axiosInstance.ts";

const Signup: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signup = async () => {
        try {

            await AxiosInstance.post('/users/register', {
                fullName,  password, email
            });

            setFullName('');
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
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder="Full Name here" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email here" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password here" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary col-12 mt-3" onClick={signup}>Register Now</button>
                        <Link to="/login" className="btn btn-outline-success col-12 mt-4">Already have and Account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;