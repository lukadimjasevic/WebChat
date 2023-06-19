import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../store/hooks";

const Navbar = () => {

	const user = useUser();

	let links;

	const publicLinks = [
		{ path: "/", name: "Home" },
	];

	const authLinks = [
		{ path: "/register", name: "Register" },
		{ path: "/login", name: "Login" },
	];

	const protectedLinks = [
		{ path: "/chats", name: "Chats" },
		{ path: "/dashboard", name: "Dashboard" }
	]

	if (!user.username) links = publicLinks.concat(authLinks);
	else links = publicLinks.concat(protectedLinks);

    return (
	<nav className="navbar navbar-expand-sm bg-primary bg-body-tertiary">
		<div className="container-fluid">
			<span className="navbar-brand text-primary">WebChat</span>
			<button 
				type="button" 
				className="navbar-toggler" 
				data-bs-toggle="collapse" 
				data-bs-target="#navbarNavAltMarkup" 
				aria-controls="navbarNavAltMarkup" 
				aria-expanded="false" 
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					{links.map(({ name, path }, index) => (
						<Link to={path} className="nav-link text-primary" key={index}>
							{name}
						</Link>
					))}
				</div>
		  </div>
		</div>
	</nav>
	);
};

export default Navbar;