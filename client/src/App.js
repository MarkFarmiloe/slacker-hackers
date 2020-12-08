import React, { useEffect, useState } from "react";

import "./App.css";
import { getMessage } from "./service";
import logo from "./logo.svg";
import { Route } from "react-router-dom";
import Filter from './components/Filter/Filter';


export function App() {
	const [message, setMessage] = useState("Loading.........");

	// useEffect(() => {
	// 	getMessage().then((message) => setMessage(message));
	// }, []);

	return (
		<main role="main">
			<div>
				<img className="logo" data-qa="logo" src={logo} alt="Just the React logo" />
				<h1 className="message" data-qa="message">fdfjdsjkfhdsgasdfgdf</h1>
			</div>

			<Filter />
		</main>
	);
}

export default App;
