import React from 'react';
import './App.css';
import {neuralNetwork} from "./Training";
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
			const positionData = {
				start: {...this.prevPos},
				stop: {...offSetData},
			};
			this.line = this.line.concat(positionData);
			this.paint(this.prevPos, offSetData, this.userStrokeStyle);
		}
	}

	endPaintEvent() {
		if (this.isPainting) {
			this.isPainting = false;
		}
	}

	paint(prevPos, currPos, strokeStyle) {
		const {offsetX, offsetY} = currPos;
		const {offsetX: x, offsetY: y} = prevPos;

		this.context.beginPath();
		this.context.strokeStyle = strokeStyle;
		this.context.moveTo(x, y);
		this.context.lineTo(offsetX, offsetY);
		this.context.stroke();
		this.prevPos = {offsetX, offsetY};
	}

	clearCanvas() {
		let canvas = document.getElementById("drawingCanvas");
		let context = canvas.getContext("2d");
		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#474B4F";
		context.fill();
	}

	componentDidMount() {
		let parent = document.getElementById("drawingDiv");
		this.canvas.style.width = "100%";
		this.canvas.height = parent.clientHeight * 0.8;
		this.context = this.canvas.getContext('2d');
		this.context.lineJoin = 'round';
		this.context.lineCap = 'round';
		this.context.lineWidth = 5;

		this.context.fillStyle = this.userStrokeStyle;
		this.context.fillRect(50, 50, 200, 200);

	}

	//===========================================================

	render() {
		return <div id={"drawingDiv"}>
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

window.onresize = function () {
	let canvas = document.getElementById("drawingCanvas");
	let parent = document.getElementById("drawingDiv");
	canvas.width = parent.clientWidth;
	canvas.height = parent.clientHeight * 0.8;
}

export default Drawing
