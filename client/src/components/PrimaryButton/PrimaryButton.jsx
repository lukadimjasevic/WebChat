import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = ({ children, onClick, className }) => {
    return (
        <button className={`primary-button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;