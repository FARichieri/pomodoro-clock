import './App.css';

function App() {
  return (
    <div className="AppContainer">
      <div className='pomodoroContainer'>
        <h3 className='title'>25 + 5 Clock</h3>

      <div className='breakAndSession'>
        <div id="break-label">
          <p>Break Length</p>
          <div className='upDownContainer'>
            <button id="break-decrement">↓</button>
              <p id="break-length">5</p>
            <button id="break-increment">↑</button>
          </div>
        </div>
        <div id="session-label">
          <p>Session Length</p>
          <div className='upDownContainer'>
            <button id="session-decrement">↓</button>
              <p id="session-length">25</p>
            <button id="session-increment">↑</button>
          </div>
        </div>
      </div>

      <div className='session' d="timer-label">
        <p>Session</p>
        <p id="time-left">25:00</p>
      </div>
        <button id="start_stop">≧</button>
        <button id="reset">↺</button>
      <div>
        
      </div>

      </div>
    </div>
  );
}

export default App;
