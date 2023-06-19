import { io } from "socket.io-client";
import { config } from "./config/socket";

export const socket = io(config.SOCKET_SERVER);

export const connect = () => {
	socket.connect();
}

export const disconnect = () => {
	socket.disconnect();
}