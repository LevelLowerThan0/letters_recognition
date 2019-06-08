import React from 'react';
import logo from './hoa.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={256} height={256}/>
        <p>
          Letters recognition with neural network and k-NN.
        </p>
      </header>
    </div>
  );
}

export default App;
