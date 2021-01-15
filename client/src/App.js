import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import "./App.css";
import Heading from "./components/Heading/Heading";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudenProfile from "./pages/SudentProfile/StudenProfile";
import { UserContext } from './contexts/userContext';
import Threshold from "./pages/Threshold/Threshold";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard"
import Settings from "./pages/Settings/Settings";
import AccessDenied from "./components/AccessDenied/AccessDenied";

export function App() {
	const [user, setUser] = useState('');

	//check if user exists in local storage and keep it logged in
	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		
		if (loggedInUser) {
		  setUser(loggedInUser);
		}
	  }, []);

	  let role = localStorage.getItem('role');
	  console.log('role', role)


	return (
		<main role="main" style={{ backgroundColor: 'rgb(243,244,246)', minHeight: '100vh'}}>
			<UserContext.Provider value={{user, setUser}}>
				<Heading />
				<Route exact path='/' component={Dashboard} />
				<Route path='/login' component={LogIn} />
				<Route path='/sign-up' component={SignUp} />
				<Route path='/student-profile/:name' component={StudenProfile} />
				<Route path='/threshold' component={role == 'mentor' || role == 'admin' ? Threshold : AccessDenied} />
				<Route path='/leaderboard' component={ LeaderBoard} />
				<Route path='/settings' component={role == 'admin' ? Settings : AccessDenied} /> 
			</UserContext.Provider>
		</main>
	);
}

export default App;
