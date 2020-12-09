import React, { useEffect, useState } from "react";

import "./App.css";
import Heading from "./components/Heading/Heading";
import Dashboard from "./pages/Dashboard/Dashboard";


export function App() {

	return (
		<main role="main">
			<Heading />
			<Dashboard />
		</main>
	);
}

export default App;
