import React from "react";
import { User } from "../../../models/User";


const Logout = () => {

	const user = new User();

    return (
	<>
		<div className="row g-0 row-cols-1 gap-3">
			<span className="col">Logout</span>
			<hr className="col" />
		</div>
		<div className="row g-0 mt-3 justify-content-center">
			<button type="button" className="col-md-3 btn btn-danger btn-lg" onClick={() => user.logout()}>
				Logout
			</button>
		</div>
	</>
	);
};


export default Logout;