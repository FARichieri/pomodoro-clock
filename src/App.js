import './App.css';
import React, { useEffect, useState, useRef } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [clockTime, setClockTime] = useState(1500);
  const [play, setPlay] = useState(false);
  const [breakSession, setbreakSession] = useState(false);
  const [playAudio, setPlayAudio] = useState(true)
  const myRef = useRef(null);

  const convertMtoMS = (value) => {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    )
  }

  const [displayClock, setDisplayClock] = React.useState(convertMtoMS(clockTime));

  useEffect(() => {
    let interval = null;
    if (play && !breakSession) {
      interval = setInterval(() => {
        if (clockTime > 0) {
          setClockTime((time) => time - 1)
          if (playAudio === true && clockTime === 1) {
            myRef.current.play();
          }
        } else {
          setbreakSession(true)
          setPlay(false);
          setClockTime(breakLength * 60)
          clearInterval(interval)
        }
      }, 1000)
    }
    if (breakSession && !play) {
      console.log(clockTime)
      interval = setInterval(() => {
        if (clockTime > 0) {
          setClockTime((time) => time - 1)
          if (playAudio === true && clockTime === 1) {
            myRef.current.play();
          }
        } else {
          setbreakSession(false)
          setPlay(true);
          setClockTime(sessionTime * 60)
          clearInterval(interval)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [play, sessionTime, displayClock, clockTime, breakSession, breakLength, playAudio, myRef])

  function handleReset() {
    setBreakLength(5)
    setSessionTime(25)
    setClockTime(1500)
    setDisplayClock(convertMtoMS(1500))
    setbreakSession(false)
    setPlay(false);
    setPlayAudio(false)
    myRef.current.pause();
    myRef.current.currentTime = 0;
  }

  function handleIncrement(e) {
    if (e.target.id === 'break-increment' && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
    if (e.target.id === 'session-increment' && sessionTime < 60) {
      setSessionTime(sessionTime + 1);
      setClockTime(clockTime + 60)
      setDisplayClock(convertMtoMS(sessionTime * 60 + 60))
    }
  }

  function handleDecrement(e) {
    if (e.target.id === 'break-decrement' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
    if (e.target.id === 'session-decrement' && sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      setClockTime(clockTime - 60)
      setDisplayClock(convertMtoMS(sessionTime * 60 - 60))
    }
  }

  function handlePlay() {
    setPlay(!play)
    setPlayAudio(true)
  }

  return (
    <div className="AppContainer">
      <div className='pomodoroContainer'>
        <div className='pomodoro'>
        <h3 className='title'>25 + 5 Clock</h3>

      <div className='breakAndSession'>
        <div id="break-label">
          <p>Break Length</p>
          <div className='upDownContainer'>
            <button id="break-decrement" onClick={handleDecrement} />
              <p id="break-length">{breakLength}</p>
            <button id="break-increment" onClick={handleIncrement} />
          </div>
        </div>
        <div id="session-label">
          <p>Session Length</p>
          <div className='upDownContainer'>
            <button id="session-decrement" onClick={handleDecrement} />
              <p id="session-length">{sessionTime}</p>
            <button id="session-increment" onClick={handleIncrement} />
          </div>
        </div>
      </div>

      <div className={breakSession ? 'breakSession' : 'session'}>
        <div id="timer-label">
          <p>{breakSession ? 'Break' : 'Session'}</p>
        </div>

        <div>
          <p id="time-left">{convertMtoMS(clockTime)}</p>
        </div>
      </div>
      <div className='playAndStop'>
        <button id="start_stop" onClick={handlePlay} />
        <button id="reset" onClick={handleReset} />
      </div>
      </div>
        <p className='by'><a href="https://github.com/FARichieri" target="_blank" rel="noreferrer">By frichieri</a></p>
      <audio
          id="beep"
          preload="auto"
          ref={myRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        </div>
    </div>
  );
}

export default App;
