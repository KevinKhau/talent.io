import './App.css';

function App() {
  return (
      <div className="App">
        {[...Array(4)].map((e, i) => <div className="corner" key={i}>♦</div>)}
        {[...Array(10)].map((e, i) => <div className="square" key={i}>*</div>)}
      </div>
  );
}

export default App;
