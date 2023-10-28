import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faCog} from '@fortawesome/free-solid-svg-icons'; // Import the settings icon
import '../PomodoroTimer.css';
import SettingsPopup from './SettingsPopup'; // Import the new component

const PomodoroTimer = () => {
  const [time, setTime] = useState({ minutes: 50, seconds: 0 });
  const [timerRunning, setTimerRunning] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [sessionType, setSessionType] = useState('study');
  const [rotateClass, setRotateClass] = useState('');
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // State for showing/hiding settings
  const [studyTime, setStudyTime] = useState(50); // Initial study time
  const [breakTime, setBreakTime] = useState(25); // Initial break time

  const handleSessionTypeChange = (type, duration) => {
    setSessionType(type);
    setTime({ minutes: duration, seconds: 0 });
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);

    if (!timerRunning && time.minutes === 50 && time.seconds === 0) {
      setTimerCompleted(false);
    }
  };

  useEffect(() => {
    let timerInterval;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        if (time.minutes === 0 && time.seconds === 0) {
          clearInterval(timerInterval);
          setTimerRunning(false);
          setTimerCompleted(true);
        } else {
          if (time.seconds === 0) {
            setTime({ minutes: time.minutes - 1, seconds: 59 });
          } else {
            setTime({ ...time, seconds: time.seconds - 1 });
          }
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [time, timerRunning]);

  const handleRestart = () => {
    setTime({ minutes: 50, seconds: 0 });
    setTimerRunning(false);
    setIsRestarting(!isRestarting);
    setRotateClass('rotate');
    setTimeout(() => {
      setRotateClass('');
    }, 500);
    setTimerCompleted(false);
  };

  const buttonText = timerCompleted ? 'Start' : timerRunning ? 'Pause' : 'Start';

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleSettingsSave = () => {
    // Update the study and break times with the new values
    setTime({ minutes: studyTime, seconds: 0 });
    setBreakTime(breakTime);
    setShowSettings(false);
  };

  return (
    <div className="pomodoro-timer-container">
      <h2>pomodoro</h2>
      <div className="timer-controls">
        <button
          className={`control-button ${
            sessionType === "study" ? "active" : ""
          }`}
          onClick={() => handleSessionTypeChange("study", 50)}
        >
          Study
        </button>
        <button
          className={`control-button ${
            sessionType === "break" ? "active" : ""
          }`}
          onClick={() => handleSessionTypeChange("break", 25)}
        >
          Break
        </button>
      </div>
      <div className="clock">
        <div className="clock-numbers">
          <span className="digit">
            {time.minutes.toString().padStart(2, "0").charAt(0)}
          </span>
          <span className="digit">
            {time.minutes.toString().padStart(2, "0").charAt(1)}
          </span>
          <span>:</span>
          <span className="digit">
            {time.seconds.toString().padStart(2, "0").charAt(0)}
          </span>
          <span className="digit">
            {time.seconds.toString().padStart(2, "0").charAt(1)}
          </span>
        </div>
      </div>
      <div className="timer-actions">
        <button className="action-button" onClick={toggleTimer}>
          {buttonText}
        </button>
        <FontAwesomeIcon
          icon={faRedoAlt}
          className={`action-icons ${rotateClass}`}
          onClick={handleRestart}
        />
        <FontAwesomeIcon
          icon={faCog}
          className="action-icons"
          onClick={handleSettingsClick}
        />
      </div>
      {showSettings && (
        <SettingsPopup
          showSettings={showSettings}
          setStudyTime={setStudyTime}
          studyTime={studyTime}
          setBreakTime={setBreakTime}
          breakTime={breakTime}
          handleSettingsClose={handleSettingsClose}
          handleSettingsSave={handleSettingsSave}
        />
      )}
    </div>
  );
};

export default PomodoroTimer;
