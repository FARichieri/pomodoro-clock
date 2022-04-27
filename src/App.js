import './App.css';
import React from 'react';

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionTime, setSessionTime] = React.useState(25);
  // const [clockTime, setClockTime] = React.useState(1500);
  const [play, setPlay] = React.useState(true);


  const convertMtoMS = (value) => {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    )
  }

  const [displayClock, setDisplayClock] = React.useState(convertMtoMS(1500));


  function handleReset() {
    setBreakLength(5)
    setSessionTime(25)
    // setClockTime(25)
    setDisplayClock(convertMtoMS(1500))
  }

  function handleIncrement(e) {
    if (e.target.id === 'break-increment' && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
    if (e.target.id === 'session-increment' && sessionTime < 60) {
      setSessionTime(sessionTime + 1);
      // setClockTime(clockTime + 1)
      setDisplayClock(convertMtoMS(sessionTime * 60 + 60))
    }
  }

  function handleDecrement(e) {
    if (e.target.id === 'break-decrement' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
    if (e.target.id === 'session-decrement' && sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      // setClockTime(clockTime - 1)
      setDisplayClock(convertMtoMS(sessionTime * 60 - 60))
    }
  }



    
    var seconds = 0;
    var interval;
    function pomodoro(mins) {
      seconds = mins*60 || 0;     
      var interval = setInterval(function() {
            if (play === false) console.log("Debería terminar")
            seconds--;
            console.log(convertMtoMS(seconds))
            setDisplayClock(convertMtoMS(seconds))
            if(!seconds){
                clearInterval(interval); 
            }
      },1000)
    }

    function handlePlay() {
      if (play === true) {
        (pomodoro(sessionTime))
        setPlay(false)
      } else {
        setPlay(true)
        clearInterval(interval)
      }
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
        <p id="time-left">{displayClock}</p>
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
