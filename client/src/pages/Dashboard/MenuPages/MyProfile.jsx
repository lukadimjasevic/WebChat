import React, { useState, useRef, useEffect } from "react";
import "./MenuPages.css";
import { AiOutlineUser } from "react-icons/ai";
import { Input, PrimaryButton } from "../../../components";
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
		<span>My profile</span>
		<hr />
		<div className="row flex-row justify-content-between align-items-start fs-14">
			<div className="col-md-8">
				<Input 
					placeholder="Your name" 
					label="Name" 
					onChange={(e) => setProfile(profile.setName(e.target.value))}
					reference={nameRef}
					className="mb-3"
				/>
				<Input 
					textarea={true}
					placeholder="Give yourself a word..."
					label="Bio"
					onChange={(e) => setProfile(profile.setBio(e.target.value))}
					reference={bioRef}
				/>
			</div>
			<div className="col-md-4 d-flex flex-column">
				<input type="file" ref={pictureRef} style={{display: "none"}} onChange={handleOnChangePicture}/>
				<span className="mb-2">Profile picture</span>
				<button type="button" className="mb-3" onClick={() => pictureRef.current.click()}>
					{!previewPicture
						? <AiOutlineUser className="upload-profile-picture" />
						: <img 
							src={previewPicture} 
							className="upload-profile-picture"
						/>
					}
				</button>
			</div>
		</div>

		<div className="d-flex justify-content-end mt-2">
			<PrimaryButton onClick={handleOnUpdateProfile}>Update</PrimaryButton>
		</div>
	</>
	);
};

export default MyProfile;
