export class Notification {
    constructor(message="", type="") {
        this.message = message;
        this.type = (type === "ok") ? "success" : "danger";
    }

    setMessage(message) {
        this.message = message;
    }
}