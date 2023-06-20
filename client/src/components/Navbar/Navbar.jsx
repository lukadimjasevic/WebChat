import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../store/hooks";
import { navbarPublicLinks, navbarAuthLinks, navbarProtectedLinks } from "../../routes";


const Navbar = () => {

	const user = useUser();

	let links;

	if (!user.username) links = navbarPublicLinks.concat(navbarAuthLinks);
	else links = navbarPublicLinks.concat(navbarProtectedLinks);

    return (
	<nav className="navbar navbar-expand-sm bg-primary bg-body-tertiary">
		<div className="container-fluid">
			<span className="navbar-brand text-primary">WebChat</span>
			<button 
				type="button" 
				className="navbar-toggler btn-close-white" 
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