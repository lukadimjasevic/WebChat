import React, { useState, useRef, useEffect } from "react";
import "./MenuPages.css";
import { AiOutlineUser } from "react-icons/ai";
import { Profile } from "./utils/Profile";
import { updateProfile } from "./utils/put";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { show } from "../../../features/alert";

const MyProfile = () => {

	const dispatch = useDispatch();
	const { data: { name, bio, picture }} = useLoaderData();

	const nameRef = useRef();
	const bioRef = useRef();
	const pictureRef = useRef();
	
	const [previewPicture, setPreviewPicture] = useState(picture ? `data:image/png;base64,${picture}` : null);
	const [profile, setProfile] = useState(new Profile(name, bio, picture)); // Maybe Redux is better option

	useEffect(() => {
		nameRef.current.value = name;
		bioRef.current.value = bio;
	}, []);

	const handleOnChangePicture = () => {
		const file = pictureRef.current.files[0];
		setProfile(profile.setPicture(file));
		
		const reader = new FileReader();
		reader.onload = () => {
			setPreviewPicture(reader.result);
		};
		reader.readAsDataURL(file);
	}

	const handleOnUpdateProfile = async() => {
		const res = await updateProfile(profile);

		dispatch(show(res));
	}

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
						onChange={(e) => setProfile(profile.setName(e.target.value))}
						ref={nameRef}
					/>
					<label htmlFor="name" className="col">Your name</label>
				</div>
				<div className="row g-0 form-floating my-3">
					<textarea 
						id="bio" 
						placeholder="Give yourself a word..."
						className="col form-control bg-custom-primary text-primary border-custom-primary"
						onChange={(e) => setProfile(profile.setBio(e.target.value))}
						ref={bioRef}>
					</textarea>
					<label htmlFor="bio" className="col">Bio</label>
				</div>
			</div>
			<div className="col-md-4 d-flex justify-content-center align-items-center">
				<input 
					type="file" 
					ref={pictureRef} 
					style={{display: "none"}}
					className="row g-0"
					onChange={handleOnChangePicture}
				/>
				<button type="button" className="row g-0" onClick={() => pictureRef.current.click()}>
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
			<button type="button" className="col-md-3 btn btn-primary btn-lg" onClick={handleOnUpdateProfile}>
				Update
			</button>
		</div>
	</>
	);
};

export default MyProfile;