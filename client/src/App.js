// import {  } from "express";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import "./App.css";
import Heading from "./components/Heading/Heading";
import Dashboard from "./pages/Dashboard/Dashboard";


export function App() {

	return (
		<Router>
			<main role="main">
				<Heading />
				<Link to={"/dashboard"}>Dashboard</Link>
				<Route path="/dashboard" component={Dashboard} />
			</main>
		</Router>
	);
}

export default App;
