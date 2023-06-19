import React, { useState } from "react";
import { registerUser } from "../../api/users";
import { RegisterData } from "./utils/RegisterData";
import { toast } from "react-toastify";


const Register = () => {

    const [register, setRegister] = useState(new RegisterData());

    const handleRegister = async() => {
        if (!register.comparePasswords()) 
            return setAlert(new NotificationWarning("Passwords do not match, please retype"));
        
        const { status, message } = await registerUser(register);

        if (status === "success") {
            location.reload();
            return;
        }

        toast.error(message);
    }
    
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
                onChange={(e) => setRegister(register.setUsername(e.target.value))} 
            />
            <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="email"
                id="email" 
                placeholder="Enter an email" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => setRegister(register.setEmail(e.target.value))}
            />
            <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="password"
                id="password" 
                placeholder="Create a password" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => setRegister(register.setPassword(e.target.value))}
            />
            <label htmlFor="password">Password</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="password"
                id="password-retype" 
                placeholder="Retype a password" 
                className="form-control bg-custom-secondary text-primary border-custom-primary"
                onChange={(e) => setRegister(register.setRetypePassword(e.target.value))}
            />
            <label htmlFor="password-retype">Retype a password</label>
        </div>

        <div className="row g-0">
            <button type="button" className="col-md-4 btn btn-primary btn-lg" onClick={handleRegister}>
                Register
            </button>
        </div>

    </div>
    );
}

export default Register;