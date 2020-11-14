import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Formation
import AddFormation from "../pages/Formations/addFormation";
import DetailsFormation from "../pages/Formations/detailFormation";
import ModifFormation from "../pages/Formations/modifFormation";

const userRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/formations", component: AddFormation },
	{ path: "/detailsFormation/:formation", component: DetailsFormation },
	{ path: "/modifFormation/:formation", component: ModifFormation },
	
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const authRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },

];

export { userRoutes, authRoutes };
