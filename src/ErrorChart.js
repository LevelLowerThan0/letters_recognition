import React from "react";
import Chart from 'chart.js';

class ErrorChart extends React.Component {

	render() {
		return <div>
			<canvas id="chartCanvas" width="600" height="750"/>
		</div>
	}

	static drawChart(data, labels) {
		let canvas = document.getElementById("chartCanvas");
		let context = canvas.getContext("2d");
		new Chart(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					data: data,
					borderWidth: 2,
					backgroundColor: "#474B4F",
					borderColor: "#86C232",
					fill: false,
					pointRadius: 1
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: "Error chart",
					fontSize: 16,
					fontColor: "#86C232"
				},
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						gridLines:{
							color: "#474B4F"
						},
						ticks: {
							fontColor: "#d4d7db",
							beginAtZero: true
						}
					}],
					xAxes: [{
						gridLines:{
							color: "#474B4F"
						}
					}]
				}
			}
		});
	}

}

export default ErrorChart;
