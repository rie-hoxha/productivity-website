// App.js
import React, { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import '../src/themes.css';

function App() {
  const [selectedBackground, setSelectedBackground] = useState('theme1');

  const handleBackgroundChange = (newBackground) => {
    console.log('Changing background to:', newBackground);
    setSelectedBackground(newBackground);
  };

  console.log('Selected background:', selectedBackground);

  return (
    <div className={`App ${selectedBackground}`}>
      <PomodoroTimer
        selectedBackground={selectedBackground}
        handleBackgroundChange={handleBackgroundChange}
      />
    </div>
  );
}

export default App;
