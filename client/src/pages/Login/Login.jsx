import React, { useState } from "react";
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
    <div className="container">

        <div className="row mb-3">
            <h3 className="col">Login</h3>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="email"
                id="email" 
                placeholder="Enter an email" 
                className="form-control bg-custom-secondary text-primary"
                onChange={(e) => setLogin(login.setEmail(e.target.value))}
            />
            <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3" >
            <input 
                type="password"
                id="password" 
                placeholder="Enter a password" 
                className="form-control bg-custom-secondary text-primary"
                onChange={(e) => setLogin(login.setPassword(e.target.value))}
            />
            <label htmlFor="password">Password</label>
        </div>

        <div className="row g-0">
            <button type="button" className="col-md-4 btn btn-primary btn-lg" onClick={handleLogin}>
                Login
            </button>
        </div>

    </div>
    );
};

export default Login;
