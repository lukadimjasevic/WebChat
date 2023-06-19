import { useSelector } from "react-redux";


export const useUser = () => {
	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	return { username, email };
}