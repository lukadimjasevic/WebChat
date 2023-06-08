export class Group {
	constructor(name=null, code=null) {
		this.name = name;
		this.code = code;
	}

	setName(value) {
		this.name = value;
		return this;
	}

	setCode(value) {
		this.code = value;
		return this;
	}

	reset() {
		this.name = null;
		this.code = null;
		return this;
	}
}