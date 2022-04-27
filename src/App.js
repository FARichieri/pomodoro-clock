import './App.css';
import React from 'react';

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionTime, setSessionTime] = React.useState(25);
  const [clockTime, setClockTime] = React.useState(convertMtoMS(25));
  const [play, setPlay] = React.useState(false);

  function convertMtoMS(value) {
    const minutes = parseInt(value, 10);
    let seconds = Math.floor(minutes / 60); 
    if (minutes < 1) {minutes = "0"+minutes;}
    if (seconds < 1) {seconds = "0"+seconds;}
    return minutes+':'+seconds; 
  }

  function handleReset() {
    setBreakLength(5)
    setSessionTime(25)
    setClockTime(25)
  }

  function handleIncrement(e) {
    if (e.target.id === 'break-increment' && breakLength < 61) {
      setBreakLength(breakLength + 1);
    }
    if (e.target.id === 'session-increment') {
      setSessionTime(sessionTime + 1);
      setClockTime(clockTime + 1)
    }
  }

  function handleDecrement(e) {
    if (e.target.id === 'break-decrement' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
    if (e.target.id === 'session-decrement' && sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      setClockTime(clockTime - 1)
    }
  }

  function handlePlay() {
    if (play === false) {
      setClockTime(pomodoro(sessionTime))
      setPlay(true)
    } else {
      clearInterval(interval)
      setPlay(false)
    }
  }

    var seconds = 0;
    var interval ;
    function pomodoro(mins) {
      seconds = mins*60 || 0;     
      interval = setInterval(function() {
            seconds--;
            setClockTime(seconds);
            if(!seconds){
                clearInterval(interval); 
            }
      },1000)
    }

  return (
    <div className="AppContainer">
      <div className='pomodoroContainer'>
        <h3 className='title'>25 + 5 Clock</h3>

      <div className='breakAndSession'>
        <div id="break-label">
          <p>Break Length</p>
          <div className='upDownContainer'>
            <button id="break-decrement" onClick={handleDecrement}>↓</button>
              <p id="break-length">{breakLength}</p>
            <button id="break-increment" onClick={handleIncrement}>↑</button>
          </div>
        </div>
        <div id="session-label">
          <p>Session Length</p>
          <div className='upDownContainer'>
            <button id="session-decrement" onClick={handleDecrement}>↓</button>
              <p id="session-length">{sessionTime}</p>
            <button id="session-increment" onClick={handleIncrement}>↑</button>
          </div>
        </div>
      </div>

      <div className='session' id="timer-label">
        <p>Session</p>
        <p id="time-left">{clockTime}</p>
      </div>
        <button id="start_stop" onClick={handlePlay}>≧</button>
        <button id="reset" onClick={handleReset}>↺</button>
      <div>
        
      </div>

      </div>
    </div>
  );
}

export default App;
