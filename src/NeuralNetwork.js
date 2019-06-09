import * as tf from "@tensorflow/tfjs";
import ReactDOM from "react-dom";
import App from "./index";
import Training from "./Training";
import React from "react";
import ErrorChart from "./ErrorChart";

class NeuralNetwork{

	constructor(learningRate, epochs){
		this.learningRate = learningRate;
		this.epochs = epochs;
	}

	train() {
		const model = tf.sequential()

		const hiddenLayer = tf.layers.dense({
			units: 10,
			inputShape: [16],
			activation: 'sigmoid'
		})
		const outputLayer = tf.layers.dense({
			units: 5,
			activation: 'sigmoid'
		})

		model.add(hiddenLayer)
		model.add(outputLayer)
		model.compile({
			optimizer: tf.train.sgd(this.learningRate),
			loss: tf.losses.meanSquaredError
		})

		const x = tf.tensor2d([
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7],
			[1, 2, 5, 4, 5, 6, 5, 8, 9, 1, 5, 3, 4, 5, 5, 7],
			[1, 2, 1, 4, 5, 6, 1, 8, 9, 1, 2, 1, 4, 5, 6, 1]
		])

		const y = tf.tensor2d([
			[1, 1, 1, 1, 1],
			[1, 1, 0, 0, 1],
			[1, 0, 0, 1, 1]
		])

		this.fit(model, x, y).then((result) => {
			// model.predict(tf.tensor2d([[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]])).print()
			ReactDOM.render(<Training text="Training completed"/>, document.getElementById('trainingColumn'));
			ErrorChart.drawChart(result);
		})

	}

	async fit(model, x, y) {
		const h = await model.fit(x, y, {epochs: this.epochs, shuffle: true})
		return h.history
	}
}
export default NeuralNetwork
