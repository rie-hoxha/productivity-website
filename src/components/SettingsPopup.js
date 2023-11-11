// SettingsPopup.js
import React, { useState} from 'react';
import '../SettingsPopup.css';
import '../themes.css';

const SettingsPopup = ({
  showSettings,
  setStudyTime,
  studyTime,
  setBreakTime,
  breakTime,
  handleSettingsClose,
  handleSettingsSave,
  handleBackgroundChange,
}) => {
  const [selectedSetting, setSelectedSetting] = useState('general');
  const [selectBackground, setSelectBackground] = useState('theme1');

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
          <div className="input-container">
            <div className="input-label">
              Select theme:
              </div>
              <div className='input-dropdown'>
              <select
                value={selectBackground}
                onChange={(e) => setSelectBackground(e.target.value)}
              >
                <option value="theme1">The Lights in the Dark</option>
                <option value="theme2">Osaka Anime Aquarium</option>
                <option value="theme3">Gojo Satoru</option>
                <option value="theme4">Sunset on the Train</option>
                <option value="theme5">A day in the Spring</option>
                <option value="theme6">Sky full of Stars</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleResetAll = () => {
    setStudyTime(50);
    setBreakTime(25);
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
        <button className="save-button" onClick={() => { handleSettingsSave(); handleBackgroundChange(selectBackground); }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPopup;
