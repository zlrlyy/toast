import './App.css';
import Toast from './compoment/toast';

function App() {
  const handleClick = () => {
    Toast.info('123', 3000)
  }
  return (
    <div className="App">
      <header className="App-header">
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
