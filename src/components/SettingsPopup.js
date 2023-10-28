import React, { useState } from 'react';
import '../SettingsPopup.css';

const SettingsPopup = ({
  showSettings,
  setStudyTime,
  studyTime,
  setBreakTime,
  breakTime,
  handleSettingsClose,
  handleSettingsSave,

  sessionType, //Added as a prop
}) => {
  const [selectedSetting, setSelectedSetting] = useState('general');

  const handleSettingSelect = (setting) => {
    setSelectedSetting(setting);
  };

  const renderSettingContent = () => {
    if (selectedSetting === 'general') {
      return (
        <div>
          <h3 className="settings-title">General Settings</h3>
          <div className="input-container">
            <label className="input-label">
              Study Time (minutes):
              <input
                type="number"
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
              />
            </label>
            
            <label className="input-label">
              Break Time (minutes):
              <input
                type="number"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
              />
            </label>
          </div>
        </div>
      );
    } else if (selectedSetting === 'background') {
      return (
        <div>
          <h3 className="settings-title">Background Settings</h3>
          {/* Add your background settings content here */}
        </div>
      );
    }
  };

  const handleResetAll = () => {
    // Reset the study and break times to their initial values
    setStudyTime(50); // Set it to the initial study time
    setBreakTime(25); // Set it to the initial break time

    // For the background resetting later
  };
  

  return (
    <div className={`settings-popup ${showSettings ? 'show' : ''}`}>
      <div className="split-screen">
        <div className="left-panel">
          <button
            className={`left-panel-button ${selectedSetting === 'general' ? 'selected' : ''}`}
            onClick={() => handleSettingSelect('general')}
          >
            General
          </button>
          <button
            className={`left-panel-button ${selectedSetting === 'background' ? 'selected' : ''}`}
            onClick={() => handleSettingSelect('background')}
          >
            Background
          </button>
        </div>
        <div className="right-panel">
          {renderSettingContent()}
        </div>
      </div>
      <div className="button-container">
         <button className="reset-all-button" onClick={handleResetAll}>
          Reset All
        </button>
         <button className="close-button" onClick={handleSettingsClose}>
          Close
        </button>
        <button className="save-button" onClick={handleSettingsSave}>
          Save Changes
        </button>
       
       
      </div>
    </div>
  );
};

export default SettingsPopup;
