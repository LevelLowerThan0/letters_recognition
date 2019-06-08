import React from 'react';
import './App.css';
import Training from "./Training";
import Drawing from "./Drawing";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Letters recognition with neural network and k-NN.
				</p>
			</header>
			<div className="Content">
				<Drawing/>
				<div className="Column">
					<Training/>
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
