import { createBrowserRouter } from "react-router";

import Home from "@/pages/Home";
import Error from "@/pages/E404";

import UserForm from "@/pages/User/UserForm";
import UserSearch from "@/pages/User/UserSearch";
import UserTable from "@/pages/User/UserTable";
import NavBar from "@/pages/NavBar";

const router = createBrowserRouter([
	{
		index: true,
		Component: Home,
	},
	{
		path: "*",
		Component: Error,
	},
	{
		path: "user",
		Component: NavBar,
		children: [
			{ path: "table", Component: UserTable },
			{ path: "form", Component: UserForm },
			{ path: "search", Component: UserSearch },
		],
	},
]);

export default router;
