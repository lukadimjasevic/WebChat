import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { UserProfile } from "../../../models";
import { useLoaderData } from "react-router-dom";


const MyProfile = () => {

	const { data: { name, bio, picture }} = useLoaderData();
	const profile = new UserProfile(name, bio, picture);
	const [previewPicture, setPreviewPicture] = useState(picture ? `data:image/png;base64,${picture}` : null);
	

	// Sets loaded name and bio
	useEffect(() => {
		profile.setNameRef(name);
		profile.setBioRef(bio);
	}, []);


	// Sets new picture after upload
	useEffect(() => {
		profile.setPicture();
	}, [previewPicture]);


    return (
	<>
		<div className="row g-0 row-cols-1 gap-3">
			<span className="col">My Profile</span>
			<hr className="col" />
		</div>

		<div className="row g-0">
			<div className="bd-callout bd-callout-info">
				<span>You can change your Profile settings, such as name, bio, profile image, etc...</span>
			</div>
		</div>

		<div className="row g-0">
			<div className="col-md-8">
				<div className="row g-0 form-floating my-3">
					<input 
						type="text"
						id="name"
						placeholder="Your name"
						className="col form-control bg-custom-primary text-primary border-custom-primary"
						onChange={(e) => profile.setName(e.target.value)}
						ref={profile.getNameRef()}
					/>
					<label htmlFor="name" className="col">Your name</label>
				</div>
				<div className="row g-0 form-floating my-3">
					<textarea 
						id="bio" 
						placeholder="Give yourself a word..."
						className="col form-control bg-custom-primary text-primary border-custom-primary"
						onChange={(e) => profile.setBio(e.target.value)}
						ref={profile.getBioRef()}>
					</textarea>
					<label htmlFor="bio" className="col">Bio</label>
				</div>
			</div>
			<div className="col-md-4 d-flex justify-content-center align-items-center">
				<input 
					type="file" 
					ref={profile.getPictureRef()} 
					className="row g-0 d-none"
					onChange={() => profile.updatePicture(setPreviewPicture)}
				/>
				<button type="button" className="row g-0" onClick={() => profile.getPictureRef().current.click()}>
					{!previewPicture
						? <AiOutlineUser className="col upload-profile-picture" />
						: <img 
							src={previewPicture} 
							className="col upload-profile-picture"
						/>
					}
				</button>
			</div>
		</div>

		<div className="row g-0 mt-3">
			<button type="button" className="col-md-3 btn btn-primary btn-lg" onClick={() => profile.update()}>
				Update
			</button>
		</div>
	</>
	);
};


export default MyProfile;