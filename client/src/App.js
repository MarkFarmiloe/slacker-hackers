import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import "./App.css";
import Heading from "./components/Heading/Heading";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudenProfile from "./pages/SudentProfile/StudenProfile";
import { UserContext, UserRoleContext, UserSlackIdContext } from './contexts/userContext';
import Threshold from "./pages/Threshold/Threshold";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard"
import Settings from "./pages/Settings/Settings";
import AccessDenied from "./components/AccessDenied/AccessDenied";
import Homepage from "./pages/Homepage/Homepage";

export function App() {
	const [user, setUser] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [userSlackId, setUserSlackId] = useState(null);

	//check if user exists in local storage and keep it logged in
	useEffect(  () => {
		const loggedInUser =  localStorage.getItem('user');
		const loggedInUserRole =  localStorage.getItem('role');
		const loggedInUserSlackId =  localStorage.getItem('id');
		
		if (loggedInUser && loggedInUserRole && loggedInUserSlackId) {
		  setUser(loggedInUser);
		  setUserRole(loggedInUserRole.toLowerCase());	
		  setUserSlackId(loggedInUserSlackId);
		 
		}
	  }, [user]);

	return (
		<main role="main" style={{ backgroundColor: 'rgb(243,244,246)', minHeight: '100vh'}}>
			<UserContext.Provider value={{user, setUser}}>
				<UserRoleContext.Provider value={{userRole, setUserRole}}>
					<UserSlackIdContext.Provider value={{userSlackId, setUserSlackId}}>
						<Heading />
						
						{
							user  
							?
							<div></div>
							:
							<Route exact path='/' component={Homepage} />
						}
						
						{
							user && (userRole == 'mentor' || userRole == 'admin') 
							?
							<Route exact path='/dashboard' component={Dashboard} />
							:
							<div></div>
						}
						{
							user && (userRole == 'admin') 
							?
							<Route exact path='/threshold' component={Threshold} />
							:
							<div></div>
						}
						{
							user && (userRole == 'admin') 
							?
							<Route exact path='/settings' component={Settings} />
							:
							<div></div>
						}
						
						<Route exact path='/login' component={LogIn} />
						<Route exact path='/sign-up' component={SignUp} />
						<Route path='/student-profile/:name' component={StudenProfile} />
						<Route exact path='/leaderboard' component={LeaderBoard} />

					</UserSlackIdContext.Provider>
				</UserRoleContext.Provider>
			</UserContext.Provider>
		</main>
	);
}

export default App;
