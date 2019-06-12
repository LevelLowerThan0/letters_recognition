import React from "react";
import './App.css';
import ReactDOM from "react-dom";

export let neuralNetwork;

class Training extends React.Component {

	render() {
		return (
			<div>
				<p className={"TrainingHeader"}>Neural Network parameters</p>
				<label>Learning rate:</label>
				<input type="text" disabled defaultValue={"0.05"}/>
				<br/>
				<label>Epochs:</label>
				<input type="text" disabled defaultValue={"500"}/>
				<br/>
				<label>Activation function:</label>
				<input type="text" disabled defaultValue={"sigmoid"}/>

				<br/>
				<label>Number of inputs:</label>
				<input type="text" disabled defaultValue={"16"}/>

				<br/>
				<label>Hidden neurons:</label>
				<input type="text" disabled defaultValue={"30"}/>

				<br/>
				<label>Number of outputs:</label>
				<input type="text" disabled defaultValue={"16"}/>

				<p className={"TrainingHeader"}>Models accuracy</p>

				<label>Neural Network:</label>
				<input type="text" disabled defaultValue={"80%"}/>
				<br/>
				<label>k-Nearest Neighbours:</label>
				<input type="text" disabled defaultValue={"94.7%"}/>

				<p>
					<a href={"https://github.com/Deathbat2190/letters_recognition"}>Source code and documentation</a>
				</p>
			</div>)
	}

}

export default Training
