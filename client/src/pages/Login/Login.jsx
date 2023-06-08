import React, { useState } from "react";
import { PrimaryButton } from "../../components";
import { LoginData } from "./utils/LoginData";
import { loginUser } from "../../api/users";

const Login = () => {

    const [login, setLogin] = useState(new LoginData());

    const handleLogin = async() => {
        const res = await loginUser(login);
        if (res.status !== "ok") {
            return dispatch(show(res));
        }

        location.reload();
    }

    return (
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
    );
};

export default Login;
