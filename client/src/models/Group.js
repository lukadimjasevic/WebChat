import { useRef } from "react";
import { createGroup, joinGroup, exitGroup } from "../api/groups";
import { routes } from "../routes";
import { toast } from "react-toastify";


export class Group {


	constructor(name=null, code=null, id=null, admin=null, members=[]) {
		this.name = name;
		this.code = code;
		this.nameRef = useRef();
		this.codeRef = useRef();
		this.id = id;
		this.admin = admin;
		this.members = members;
	}


	setName(value) {
		this.name = value;
		return this;
	}


	setCode(value) {
		this.code = value;
		return this;
	}


	setId(value) {
		this.id = value;
		return this;
	}


	setAdmin(value) {
		this.admin = value;
		return this;
	}
	

	setMembers(value) {
		this.members = value;
		return this;
	}

	
	getName() {
		return this.name;
	}


	getCode() {
		return this.code;
	}


	getId() {
		return this.id;
	}

	
	getAdmin() {
		return this.admin.username;
	}


	getMembers() {
		return this.members;
	}


	countMembers() {
		return this.members.length;
	}


	reset() {
		this.setName(null);
		this.setCode(null);

		if (this.nameRef.current) {
			this.nameRef.current.value = "";
		}

		if (this.codeRef.current) {
			this.codeRef.current.value = "";
		}

		return this;
	}


	async create(revalidator, navigate) {
		const { status, message, data: { group_id: groupId } } = await createGroup(this);
		
		if (status === "success") {
			// Updating groups list
			revalidator.revalidate();
			navigate(`${routes.chat}/${groupId}`);

			this.reset();
		}

		toast(message, { type: status });
	}


	async join(revalidator, navigate) {
		const { status, message, data: { group_id: groupId } } = await joinGroup(this);
		
		if (status === "success") {
			// Updating groups list
			revalidator.revalidate();
			navigate(`${routes.chat}/${groupId}`);

			this.reset();
		}

		toast(message, { type: status });
	}


	async exit(revalidator, navigate) {
		const { status, message } = await exitGroup(this.getId());
		
		if (status === "success") {
			// Updating groups list
			revalidator.revalidate();
			navigate();
		}

		toast(message, { type: status });
	}
}