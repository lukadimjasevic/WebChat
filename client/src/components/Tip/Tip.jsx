import React from "react";
import "./Tip.css";
import { FaExclamation } from "react-icons/fa";

const Tip = ({ children, className }) => {
    return (
	<div className={`row g-0 p-3 tip align-items-center ${className}`}>
		<div className="col-md-11">{children}</div>
		<div className="col-md-1 text-end">
			<FaExclamation size={24} color="var(--highlight-secondary)" />
		</div>
	</div>
	);
};

export default Tip;
