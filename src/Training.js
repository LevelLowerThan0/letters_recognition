import React from "react";
import './App.css';
import ReactDOM from "react-dom";
import NeuralNetwork from "./NeuralNetwork";

export let neuralNetwork;

class Training extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<p className={"TrainingHeader"}>{this.props.text}</p>
				<label htmlFor="learningRateInput">Learning rate:</label>
				<input type="text" id="learningRateInput" name="learningRateInput"
				       defaultValue={this.props.learningRate === undefined ? "1" : this.props.learningRate}
				       required={true}/>
				<br/>
				<label htmlFor="epochsInput">Epochs:</label>
				<input type="text" id="epochsInput" name="epochsInput"
				       defaultValue={this.props.epochs === undefined ? "100" : this.props.epochs} required={true}/>
				<button id="trainButton" onClick={this.trainButtonOnClick}>Start training</button>
				<br/>
				<br/>
				Prediction result: A
				<br/>
				<br/>
				Model accuracy: 90%
			</div>)
	}

	trainButtonOnClick() {
		if (document.getElementById("learningRateInput") != null &&
			document.getElementById("epochsInput") != null) {
			let learningRate = parseFloat(document.getElementById("learningRateInput").value)
			let epochs = parseInt(document.getElementById("epochsInput").value)

			neuralNetwork = new NeuralNetwork(learningRate, epochs);
			ReactDOM.render(<Training text="Training in progress" learningRate={learningRate}
			                          epochs={epochs}/>, document.getElementById('trainingColumn'));

			neuralNetwork.train()

		}
	}
}

export default Training
