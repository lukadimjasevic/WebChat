import React from "react";
import { logoutUser } from "../../../api/users";


const Logout = () => {

	const handleLogout = async() => {
		const { status, message } = await logoutUser();
		
		if (status === "success") {
			location.reload();
		}
	}

    return (
	<>
		<div className="row g-0 row-cols-1 gap-3">
			<span className="col">Logout</span>
			<hr className="col" />
		</div>
		<div className="row g-0 mt-3 justify-content-center">
			<button type="button" className="col-md-3 btn btn-danger btn-lg" onClick={handleLogout}>
				Logout
			</button>
		</div>
	</>
	);
};

export default Logout;