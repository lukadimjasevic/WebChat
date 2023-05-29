import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, Alert } from "../../components";
import { LoginData } from "./utils/LoginData";
import { loginUser } from "../../fetchers/post";
import { Notification } from "../../data/Notification";

const Login = () => {

    const [login, setLogin] = useState(new LoginData());
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async() => {
        const { status, message } = await loginUser(login);

        if (status === "error") return setAlert(new Notification(message, status));

        navigate("/dashboard");
    }

    return (
        <>
            {alert ? <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert> : null}

            <div className="form">
                <span>Login</span>
                <div className="form-row">
                    <label>Email</label>
                    <input type="email" placeholder="Enter an email" className="custom-input-box" 
                    onChange={(e) => setLogin(login.setEmail(e.target.value))} />
                </div>
                <div className="form-row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter a password" className="custom-input-box"
                    onChange={(e) => setLogin(login.setPassword(e.target.value))} />
                </div>
                <div className="align-self-end">
                    <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default Login;
