import React from 'react';
import './App.css';
import Training from "./Training";
import Drawing from "./Drawing";
import ErrorChart from "./ErrorChart";

function App() {
	return (
		<div className="App">
			<div className="Content">
				<header id="content" className="App-header">
					<p>
						Letters recognition with neural network and k-NN.
					</p>
				</header>
				<div className="Column">
					<Drawing/>
				</div>
				<div id="trainingColumn" className="Column">
					<Training text="Training not started"/>
				</div>
				<div className="Column">
					<ErrorChart/>
				</div>
			</div>
			<div className="clearfix"></div>

			<hr className="splitFooter"/>
			<footer className="clearfix">Authors: Marcel Mikołajko, Wiktor Androsiuk, Aleksander Wojtecki</footer>
		</div>
	);
}

export default App;
