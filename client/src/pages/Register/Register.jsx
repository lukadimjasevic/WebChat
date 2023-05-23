import React, { useState } from "react";
import "./Register.css";
import { postRegister } from "../../fetchers/register";
import { RegisterData } from "./utils/Register";
import { NotificationSuccess, NotificationWarning } from "../../data/Notification";
import { PrimaryButton, Alert } from "../../components";

const Register = () => {

    const [register, setRegister] = useState(new RegisterData());
    const [alert, setAlert] = useState(null);

    const handleRegister = async() => {
        if (!register.comparePasswords()) 
            return setAlert(new NotificationWarning("Passwords do not match, please retype"));
        
        const res = await postRegister(register);
        
        if (res.status === "ok") return setAlert(new NotificationSuccess(res.message));
        else return setAlert(new NotificationWarning(res.message));
    }
    
    return (
        <>
            {alert ? <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert> : null}

            <div className="register">
                <span>Registration</span>
                <div className="register-input">
                    <label>Username</label>
                    <input type="text" placeholder="Enter a username" className="custom-input-box"
                    onChange={(e) => setRegister(register.setUsername(e.target.value))} />
                </div>

                <div className="register-input">
                    <label>Email</label>
                    <input type="email" placeholder="Enter an email" className="custom-input-box"
                    onChange={(e) => setRegister(register.setEmail(e.target.value))} />
                </div>

                <div className="register-input">
                    <label>Password</label>
                    <input type="password" placeholder="Create a password" className="custom-input-box"
                    onChange={(e) => setRegister(register.setPassword(e.target.value))} />
                </div>

                <div className="register-input">
                    <label>Retype password</label>
                    <input type="password" placeholder="Retype a password" className="custom-input-box"
                    onChange={(e) => setRegister(register.setRetypePassword(e.target.value))} />
                </div>

                <div className="register-footer">
                    <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
                </div>
            </div>
        </>
    );
}

export default Register;