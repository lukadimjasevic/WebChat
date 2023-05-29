import React, { useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useUser } from "../../store/hooks";

const Navigation = () => {

	const user = useUser();
	const [selectedItem, setSelectedItem] = useState("Home");

	const itemsLeft = [
		{ path: "/", name: "Home" },
	];

	const itemsRight = !user.username 
	? [
		{ path: "/register", name: "Register" },
		{ path: "/login", name: "Login" },
	] 
	: [
		{ path: "/dashboard", name: "Dashboard" }
	];


    return (
		<div className="navigation">
			<div className="navigation-left">
				{itemsLeft.map(({ path, name }) => (
					<button key={name} className="navigation-item" onClick={() => setSelectedItem(name)}>
						<Link
							to={path}
							className={selectedItem === name ? "navigation-link selected" : "navigation-link" }>{name}
						</Link>
					</button>
				))}
			</div>
			<div className="navigation-right">
				{itemsRight.map(({ path, name }) => (
					<button key={name} className="navigation-item" onClick={() => setSelectedItem(name)}>
						<Link 
							to={path} 
							className={selectedItem === name ? "navigation-link selected" : "navigation-link" }>{name}
						</Link>
					</button>
				))}
			</div>
		</div>	
	);
};

export default Navigation;
