import React from 'react';
import './App.css';
import {neuralNetwork} from "./NeuralNetwork.js";
import * as tf from "@tensorflow/tfjs";

class Drawing extends React.Component {

	//==================== DRAWING ==========================
	constructor(props) {
		super(props);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.endPaintEvent = this.endPaintEvent.bind(this);
		this.predict = this.predict.bind(this);
	}

	isPainting = false;
	userStrokeStyle = '#86C232';
	line = [];
	prevPos = {offsetX: 0, offsetY: 0};

	onMouseDown({nativeEvent}) {
		const {offsetX, offsetY} = nativeEvent;
		this.isPainting = true;
		this.prevPos = {offsetX, offsetY};
	}

	onMouseMove({nativeEvent}) {
		if (this.isPainting) {
			const {offsetX, offsetY} = nativeEvent;
			const offSetData = {offsetX, offsetY};
			// Set the start and stop position of the paint event.
			const positionData = {
				start: {...this.prevPos},
				stop: {...offSetData},
			};
			// Add the position to the line array
			this.line = this.line.concat(positionData);
			this.paint(this.prevPos, offSetData, this.userStrokeStyle);
		}
	}

	endPaintEvent() {
		if (this.isPainting) {
			this.isPainting = false;
			this.sendPaintData();
		}
	}

	paint(prevPos, currPos, strokeStyle) {
		const {offsetX, offsetY} = currPos;
		const {offsetX: x, offsetY: y} = prevPos;

		this.ctx.beginPath();
		this.ctx.strokeStyle = strokeStyle;
		// Move the the prevPosition of the mouse
		this.ctx.moveTo(x, y);
		// Draw a line to the current position of the mouse
		this.ctx.lineTo(offsetX, offsetY);
		// Visualize the line using the strokeStyle
		this.ctx.stroke();
		this.prevPos = {offsetX, offsetY};
	}

	clearCanvas() {
		let canvas = document.getElementById("drawingCanvas");
		let context = canvas.getContext("2d");
		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#474B4F";
		context.fill();
	}

	async sendPaintData() {
		const body = {
			line: this.line,
		};
		// We use the native fetch API to make requests to the server
		const req = await fetch('http://localhost:4000/paint', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'content-type': 'application/json',
			},
		});
		const res = await req.json();
		this.line = [];
	}

	componentDidMount() {
		// Here we set up the properties of the canvas element.
		this.canvas.width = 600;
		this.canvas.height = 750;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = 5;
	}

	//===========================================================

	render() {
		return <div>
			<canvas
				// We use the ref attribute to get direct access to the canvas element.
				id="drawingCanvas" width="600" height="750"
				ref={(ref) => (this.canvas = ref)}
				onMouseDown={this.onMouseDown}
				onMouseLeave={this.endPaintEvent}
				onMouseUp={this.endPaintEvent}
				onMouseMove={this.onMouseMove}
			/>
			{/*<canvas id="drawingCanvas" width="600" height="750"/>*/}
			Draw a letter and hit the button to see if the network and k-NN can recognize it.<br/>
			<button id="clearButton" onClick={this.clearCanvas}>Clear canvas</button>
			<button id="predictButton" onClick={this.predict}>Predict</button>
		</div>
	}

	predict() {
		neuralNetwork.predict(tf.tensor2d([[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]]))
	}
}

export default Drawing
