import { MdPerson, MdSettings, MdPalette, MdNotifications, MdLogout } from "react-icons/md";


// App's main routes
export const routes = {
	home				: "/",
	register			: "/register",
	login				: "/login",

	dashProfile 		: "/dashboard/profile",
	dashAccount 		: "/dashboard/account",
	dashAppearance		: "/dashboard/appearance",
	dashNotifications	: "/dashboard/notifications",
	dashLogout			: "/dashboard/logout",

	chatJoin			: "/chats/join",
	chatCreate			: "/chats/create",
	chat				: "/chats"
}


// Defines specific document titles for specific app route
export const titles = {
	[routes.home]				: "Home",
	[routes.register]			: "Register",
	[routes.login]				: "Login",

	[routes.dashProfile]		: "Your Profile",
	[routes.dashAccount]		: "Account settings",
	[routes.dashAppearance]		: "Appearance",
	[routes.dashNotifications]	: "Notifications",
	[routes.dashLogout]			: "Logout",

	[routes.chatJoin]			: "Join Chat",
	[routes.chatCreate]			: "Create Chat",
}


export const navbarPublicLinks = [
	{ path: routes.home, 		name: "Home" },
];

export const navbarAuthLinks = [
	{ path: routes.register, 	name: "Register" },
	{ path: routes.login, 		name: "Login" 	 },
];

export const navbarProtectedLinks = [
	{ path: "/chats", 			name: "Chats" 	  },
	{ path: "/dashboard", 		name: "Dashboard" }
];


export const dashboardSidebarLinks = [
	{ 
		category: "User", 
		items: [
			{ Icon: MdPerson, 		  path: routes.dashProfile, 	   name: "My profile",    },
			{ Icon: MdSettings, 	  path: routes.dashAccount,		   name: "Account",  	  },
			{ Icon: MdPalette, 		  path: routes.dashAppearance,	   name: "Appearance",    },
			{ Icon: MdNotifications,  path: routes.dashNotifications,  name: "Notifications", },
		]
	},
	{
		category: "Account",
		items: [
			{ Icon: MdLogout, path: routes.dashLogout, name: "Logout", class: "text-danger"   },
		]
	}
];


export const chatsSidebarLinks = [
	{ 
		category: "Join / Create group", 
		items: [
			{ path: routes.chatJoin,		name: "Join", 	},
			{ path: routes.chatCreate,		name: "Create", },
		]
	},
	{
		category: "Chats",
		items: [],
	}
];