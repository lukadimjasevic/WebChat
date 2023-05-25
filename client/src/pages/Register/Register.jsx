import React, { useState } from "react";
import { registerUser } from "../../fetchers/post";
import { RegisterData } from "./utils/RegisterData";
import { Notification } from "../../data/Notification";
import { PrimaryButton, Alert } from "../../components";

const Register = () => {

    const [register, setRegister] = useState(new RegisterData());
    const [alert, setAlert] = useState(null);

    const handleRegister = async() => {
        if (!register.comparePasswords()) 
            return setAlert(new NotificationWarning("Passwords do not match, please retype"));
        
        const { status, message } = await registerUser(register);

        return setAlert(new Notification(message, status));
    }
    
    return (
        <>
            {alert ? <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert> : null}

            <div className="form">
                <span>Registration</span>
                <div className="form-row">
                    <label>Username</label>
                    <input type="text" placeholder="Enter a username" className="custom-input-box"
                    onChange={(e) => setRegister(register.setUsername(e.target.value))} />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input type="email" placeholder="Enter an email" className="custom-input-box"
                    onChange={(e) => setRegister(register.setEmail(e.target.value))} />
                </div>

                <div className="form-row">
                    <label>Password</label>
                    <input type="password" placeholder="Create a password" className="custom-input-box"
                    onChange={(e) => setRegister(register.setPassword(e.target.value))} />
                </div>

                <div className="form-row">
                    <label>Retype password</label>
                    <input type="password" placeholder="Retype a password" className="custom-input-box"
                    onChange={(e) => setRegister(register.setRetypePassword(e.target.value))} />
                </div>

                <div className="align-self-end">
                    <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
                </div>
            </div>
        </>
    );
}

export default Register;