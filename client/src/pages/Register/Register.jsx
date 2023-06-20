import React from "react";
import { User } from "../../models/User";


const Register = () => {

    const user = new User();
    
    return (
    <div className="container">
        
        <div className="row mb-3">
            <h3 className="col">Registration</h3>
        </div>
        
        <div className="form-floating mb-3" >
            <input 
                type="text"
                id="username" 
                placeholder="Enter a username" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => user.setUsername(e.target.value)} 
            />
            <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="email"
                id="email" 
                placeholder="Enter an email" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => user.setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="password"
                id="password" 
                placeholder="Create a password" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => user.setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="password"
                id="password-retype" 
                placeholder="Retype a password" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => user.setRetypePassword(e.target.value)}
            />
            <label htmlFor="password-retype">Retype a password</label>
        </div>

        <div className="row g-0">
            <button type="button" className="col-md-4 btn btn-primary btn-lg" onClick={() => user.register()}>
                Register
            </button>
        </div>

    </div>
    );
}


export default Register;