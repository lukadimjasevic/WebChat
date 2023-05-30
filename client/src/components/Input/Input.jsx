import React from "react";
import "./Input.css";

const Input = ({ type="text", placeholder, label, onChange, textarea=false, className="" }) => {

	if (textarea) {
		return (
			<div className={`custom-textarea ${className}`}>
				<label htmlFor={label}>{label}</label>
				<textarea id={label} placeholder={placeholder} onChange={onChange}></textarea>
			</div>
		);
	}

    return (
		<div className={`custom-input ${className}`}>
			<label htmlFor={label}>{label}</label>
			<input id={label} type={type} placeholder={placeholder} onChange={onChange} />
		</div>
	);
};

export default Input;
