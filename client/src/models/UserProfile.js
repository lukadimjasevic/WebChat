import { User } from "./User";
import { useRef } from "react";
import { updateProfile } from "../api/users";
import { toast } from "react-toastify";


export class UserProfile extends User {
	
	
	constructor(name=null, bio=null, picture=null) {
		super();
		this.name = name;
		this.bio = bio;
		this.picture = picture;
		this.nameRef = useRef();
		this.bioRef = useRef();
		this.pictureRef = useRef();
	}


	setName(value) {
		this.name = value;
		return this;
	}


	setBio(value) {
		this.bio = value;
		return this;
	}

	setPicture() {
		if (this.pictureRef.current.files[0])
			this.picture = this.pictureRef.current.files[0];
		return this;
	}

	getNameRef() {
		return this.nameRef;
	}


	getBioRef() {
		return this.bioRef;
	}


	getPictureRef() {
		return this.pictureRef;
	}


	setNameRef(value) {
		this.nameRef.current.value = value;
		return this;
	}


	setBioRef(value) {
		this.bioRef.current.value = value;
		return this;
	}


	updatePicture(setPreviewPicture) {
		const file = this.pictureRef.current.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			setPreviewPicture(reader.result);
		};
		reader.readAsDataURL(file);
		return this;
	}


	async update() {
		const { status, message } = await updateProfile(this);
		toast(message, { type: status });
	}
}