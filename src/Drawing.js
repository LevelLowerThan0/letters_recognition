import React from 'react';
import './App.css';
import Canvas from './Canvas';



class Drawing extends React.Component {
	render() {
		return <div>
			{/*<canvas id="drawingCanvas" width="600" height="750"/>*/}
			Draw a letter and hit the button to see if the network and k-NN can recognize it.<br/>
			<button id="clearButton">Clear canvas</button>
			<button id="predictButton">Predict</button>
		</div>
	}
	static test() {
		let canvas = document.getElementById("drawingCanvas");
		let context = canvas.getContext("2d");


		context.rect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#474B4F";
		context.fill();
		context.beginPath();
		context.arc(95, 50, 40, 0, 2 * Math.PI);
		context.stroke();
		let pixels = context.getImageData(0, 0, canvas.width, canvas.height);

		// for (let i = 0; i < pixels.data.length; i += 4) {
		// 	pixels.data[i] = pixels.data[i] ^ 255;
		// 	pixels.data[i + 1] = pixels.data[i + 1] ^ 255;
		// 	pixels.data[i + 2] = pixels.data[i + 2] ^ 255;
		// 	pixels.data[i + 3] = 255;
		// }
		context.putImageData(pixels, 0, 0);
	}
}

export default Drawing
