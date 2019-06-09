import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Drawing from "./Drawing";


ReactDOM.render(<App/>, document.getElementById('root'));
Drawing.test();
// let network = new NeuralNetwork(0.5, 5000);
// network.train();
serviceWorker.unregister();
