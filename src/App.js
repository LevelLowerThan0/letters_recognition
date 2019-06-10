import React from 'react';
import './App.css';
import Training from "./Training";
import Drawing from "./Drawing";
import ErrorChart from "./ErrorChart";
import Canvas from './Canvas';

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
					<Canvas/>
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
			<div className="Documentation">
				<header id="documentation" className="App-header">
					<p>
						Documentation
					</p>
				</header>

				<div className="Column">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
					pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique.
				</div>
				<div className="Column">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
					pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique.
				</div>
				<div className="Column">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet
					pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique.
				</div>
			</div>
			<footer className="clearfix">Authors: Marcel Mikołajko, Wiktor Androsiuk, Aleksander Wojtecki</footer>
		</div>
	);
}

export default App;
