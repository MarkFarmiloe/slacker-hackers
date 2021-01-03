import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Heading from "./components/Heading/Heading";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudenProfile from "./pages/SudentProfile/StudenProfile";
import StudentData from "./components/StudentsTable/StudentData"

export function App() {

	return (
		<main role="main">
			<Heading />

			<Route exact path='/' component={Dashboard} />
			<Route path='/login' component={LogIn} />
			<Route path='/sign-up' component={SignUp} />
			<Route path='/student-profile/:name' component={StudenProfile} />
			<Route path='/StudentData' component={StudentData} />
		</main>
	);
}

export default App;
