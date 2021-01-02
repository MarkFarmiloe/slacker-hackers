import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Heading from "./components/Heading/Heading";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudenProfile from "./pages/SudentProfile/StudenProfile";
import { UserContext } from './contexts/userContext';


 

export function App() {
	const [user, setUser] = useState('');

	//check if user exists in local storage and keep it logged in
	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		
		if (loggedInUser) {
		  setUser(loggedInUser);
		}
	  }, []);
	

	return (
		<main role="main">
			<UserContext.Provider value={{user, setUser}}>
				<Heading />

				<Route exact path='/' component={Dashboard} />
				<Route path='/login' component={LogIn} />
				<Route path='/sign-up' component={SignUp} />
				<Route path='/student-profile/:name' component={StudenProfile} />
			</UserContext.Provider>
		</main>
	);
}

export default App;
