import React from "react";
import * as tf from "@tensorflow/tfjs";
import './App.css';

class Training extends React.Component {

	constructor(props) {
		super(props)
		this.state = {complete: false}
		this.train()
	}

	render() {
		let text = "Training in progress"

		if (this.state.complete) {
			text = "Training completed"
		}

		return (<div className={"App-header"}>{text}</div>)
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
			optimizer: tf.train.sgd(0.5),
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

		async function fit() {
			const h = await model.fit(x, y, {epochs: 500, shuffle: true})
			//const history = h.history
		}

		fit().then(() => {
			model.predict(tf.tensor2d([[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]])).print()
			this.setState({complete: true})
		})
	}
}

export default Training
