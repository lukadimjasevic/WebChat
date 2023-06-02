export class Profile {
	constructor(name=null, bio=null, picture=null) {
		this.name = name;
		this.bio = bio;
		this.picture = picture;
	}

	setName(value) {
		this.name = value;
		return this;
	}

	setBio(value) {
		this.bio = value;
		return this;
	}

	setPicture(value) {
		this.picture = value;
		return this;
	}
}