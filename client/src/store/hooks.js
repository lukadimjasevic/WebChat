import { useSelector } from "react-redux";


export const useUser = () => {
	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	return { username, email };
}

export const useAlert = () => {
	const visible = useSelector((state) => state.alert.visible);
	const message = useSelector((state) => state.alert.message);
	const type = useSelector((state) => state.alert.type);
	return { visible, message, type };
}