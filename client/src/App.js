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
	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		const loggedInUserRole = localStorage.getItem('role');
		const loggedInUserSlackId = localStorage.getItem('id');
		
		if (loggedInUser) {
		  setUser(loggedInUser);
		  setUserRole(loggedInUserRole);
		  setUserSlackId(loggedInUserSlackId);
		}
	  }, []);

	  
	  console.log('role', userRole)
	  console.log('user', user)
	  console.log('ID', userSlackId)


	return (
		<main role="main" style={{ backgroundColor: 'rgb(243,244,246)', minHeight: '100vh'}}>
			<UserContext.Provider value={{user, setUser}}>
				<UserRoleContext.Provider value={{userRole, setUserRole}}>
					<UserSlackIdContext.Provider value={{userSlackId, setUserSlackId}}>
						<Heading />
						
						<Route exact path='/' render={ user ? '':Homepage} />
						<Route exact path='/dashboard' render={() => user && (userRole == 'mentor' || userRole == 'admin') ? Dashboard: ''} />
						<Route exact path='/login' render={ user ? '' : LogIn} />
						<Route exact path='/sign-up' render={ user ? '' : SignUp} />
						<Route path='/student-profile/:name' component={StudenProfile} />
						<Route exact path='/threshold' render={() => user && userRole == 'admin' ? Threshold: ''} />
						<Route exact path='/leaderboard' component={LeaderBoard} />
						<Route exact path='/settings' render={() => user && userRole == 'admin' ? Settings: ''}/> 
					</UserSlackIdContext.Provider>
				</UserRoleContext.Provider>
			</UserContext.Provider>
		</main>
	);
}

export default App;
