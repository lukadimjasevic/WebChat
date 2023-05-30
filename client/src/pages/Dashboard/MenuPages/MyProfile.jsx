import React, { useState, useRef } from "react";
import "./MenuPages.css";
import { Input, PrimaryButton } from "../../../components";
import { BsPersonCircle } from "react-icons/bs";

const MyProfile = () => {

	const pictureRef = useRef();
	const [picture, setPicture] = useState(null);
	const [previewPicture, setPreviewPicture] = useState(null);

	const handleOnChangePicture = () => {
		const file = pictureRef.current.files[0];
		setPicture(file);
		
		const reader = new FileReader();
		reader.onload = () => {
			console.log(reader.result)
			setPreviewPicture(reader.result);
		};
		reader.readAsDataURL(file);
	}

    return (
	<div className="menu-page">
		<div className="menu-page-title">
			<span>My profile</span>
			<hr />
		</div>
		<div className="d-flex flex-row justify-content-between align-items-start f-14">
			<div style={{width: "70%"}}>
				<Input placeholder="Your name" label="Name" />
				<Input textarea={true} placeholder="Give yourself a word..." label="Bio" />
			</div>
			<div className="d-flex flex-column align-items-start gap-2 w-25 mt-1">
				<input type="file" ref={pictureRef} style={{display: "none"}} onChange={handleOnChangePicture}/>
				<span>Profile picture</span>
				<button type="button" onClick={() => pictureRef.current.click()}>
					{!previewPicture 
						? <BsPersonCircle size={140} />
						: <img 
							src={previewPicture} 
							className="upload-profile-picture"
						/>
					}
					<span className="change-profile-picture">Change</span>
				</button>
			</div>
		</div>
		<div className="d-flex justify-content-end mt-2">
			<PrimaryButton>Save</PrimaryButton>
		</div>
	</div>
	);
};

export default MyProfile;
