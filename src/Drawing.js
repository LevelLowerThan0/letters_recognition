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
		this.context.fillStyle = "#86C232"
		// this.context.beginPath();
		// this.context.arc(200, 200, 50, 0, 2 * Math.PI);
		// this.context.fill();

		//this.context.fillRect(50, 50, 100, 100);

		let pixels = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

		let data = this.analyze(pixels.data, this.canvas.width, this.canvas.height);
		data.print();
		neuralNetwork.predict(tf.tensor2d([[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]]));
	}

	analyze(pixels, width, height) {
		let yTop = -1, yBottom = -1, xRight = -1, xLeft = -1;
		let parameters = [];

		for (let i = 0; i < pixels.length; i += 4) {
			let r = pixels[i];
			let g = pixels[i + 1];
			let b = pixels[i + 2];

			if (r > 100 && g > 120 && b > 20) {
				yTop = Math.floor(i / 4 / width);
				break;
			}
		}

		for (let i = pixels.length - 4; i >= 0; i -= 4) {
			let r = pixels[i];
			let g = pixels[i + 1];
			let b = pixels[i + 2];

			if (r > 100 && g > 120 && b > 20) {
				yBottom = Math.floor(i / 4 / width);
				break;
			}
		}

		for (let j = 0; j < width && xLeft === -1; ++j) {
			for (let i = 0; i < height * width * 4; i += 4 * width) {
				let r = pixels[i + j * 4];
				let g = pixels[i + j * 4 + 1];
				let b = pixels[i + j * 4 + 2];

				if (r > 100 && g > 120 && b > 20) {
					xLeft = j;
					break;
				}
			}
		}

		for (let j = width - 1; j >= 0 && xRight === -1; --j) {
			for (let i = height * width * 4 - 1; i >= 0; i -= 4 * width) {
				let r = pixels[i + j * 4];
				let g = pixels[i + j * 4 + 1];
				let b = pixels[i + j * 4 + 2];

				if (r > 100 && g > 120 && b > 20) {
					xRight = j;
					break;
				}
			}
		}

		parameters[0] = Math.floor(xLeft + (xRight - xLeft) / 2);
		parameters[1] = Math.floor(yTop + (yBottom - yTop) / 2);
		parameters[2] = xRight - xLeft;
		parameters[3] = yBottom - yTop;

		let totalPixels = 0;
		let totalX = 0, totalY = 0, centerX = parameters[0], centerY = parameters[1];
		let totalX2 = 0, totalY2 = 0;
		let totalXY = 0;
		let totalX2Y = 0, totalXY2 = 0;
		let totalXEdges = 0, totalXEdgesY = 0;
		let totalYEdges = 0, totalYEdgesX = 0;
		for (let i = yTop; i <= yTop + (yBottom - yTop); ++i) {
			for (let j = xLeft * 4; j <= (xLeft + (xRight - xLeft)) * 4; j += 4) {
				let r = pixels[j + i * width * 4];
				let g = pixels[j + i * width * 4 + 1];
				let b = pixels[j + i * width * 4 + 2];

				if (r > 100 && g > 120 && b > 20) {
					++totalPixels;

					let x = j / 4 - centerX;
					let y = i - centerY;

					totalX += x;
					totalY += y;

					totalX2 += x * x;
					totalY2 += y * y;

					totalXY += x * y;

					totalX2Y += x * x * y;
					totalXY2 += x * y * y;

					let rPrev = pixels[j + i * width * 4 - 4];
					let gPrev = pixels[j + i * width * 4 + 1 - 4];
					let bPrev = pixels[j + i * width * 4 + 2 - 4];

					if (rPrev < 100 && gPrev < 120 && bPrev < 20){
						++totalXEdges;
						totalXEdgesY += y;
					}

					rPrev = pixels[j + i * width * 4 + width * 4];
					gPrev = pixels[j + i * width * 4 + 1 + width * 4];
					bPrev = pixels[j + i * width * 4 + 2 + width * 4];

					if (rPrev < 100 && gPrev < 120 && bPrev < 20){
						++totalYEdges;
						totalYEdgesX += x;
					}
				}
			}
		}

		parameters[4] = totalPixels;
		parameters[5] = Math.floor((totalX / totalPixels) / parameters[2]);
		parameters[6] = (Math.floor(totalY / totalPixels) / parameters[3]);
		parameters[7] = Math.floor(totalX2 / totalPixels);
		parameters[8] = Math.floor(totalY2 / totalPixels);
		parameters[9] = Math.floor(totalXY / totalPixels);
		parameters[10] = Math.floor(totalX2Y / totalPixels);
		parameters[11] = Math.floor(totalXY2 / totalPixels);
		parameters[12] = Math.floor(totalXEdges / totalPixels);
		parameters[13] = totalXEdgesY;
		parameters[14] = Math.floor(totalYEdges / totalPixels);
		parameters[15] = totalYEdgesX;

		console.log(yTop + " " + yBottom + " " + xLeft + " " + xRight + " " + (yBottom - yTop) + " " + (xRight - xLeft))

		return tf.tensor2d([parameters]);
	}
}

window.onresize = function () {
	let canvas = document.getElementById("drawingCanvas");
	let parent = document.getElementById("drawingDiv");
	canvas.width = parent.clientWidth;
	canvas.height = parent.clientHeight * 0.8;
}

export default Drawing
