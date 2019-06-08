import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Training from './Training'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Training/>, document.getElementById('training'));
serviceWorker.unregister();
