import React from 'react';
import './App.css';

class Drawing extends React.Component {


    //==================== DRAWING ==========================
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
    }

    isPainting = false;
    userStrokeStyle = '#86C232';
    line = [];
    prevPos = { offsetX: 0, offsetY: 0 };

    onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
    }

    onMouseMove({ nativeEvent }) {
        if (this.isPainting) {
            const { offsetX, offsetY } = nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
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
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
    }

    clearCanvas(){
        const context = this.getContext('2d');
        context.clearRect(0, 0, 600, 750);
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
			<button id="clearButton" >Clear canvas</button>
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
