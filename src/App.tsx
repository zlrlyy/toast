import React from 'react';
import logo from './logo.svg';
import './App.css';
import Toast from './compoment/toast/Toast';

function App() {
  const handleClick=()=>{
    Toast.info('123')
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span
          className="App-link"
          onClick={handleClick}
        >
          Learn React
        </span>
      </header>
    </div>
  );
}

export default App;
