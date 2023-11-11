import PomodoroTimer from './components/PomodoroTimer';
import { useState } from 'react';

import '../src/themes.css';



function App() {
  const [ selectedTheme]= useState('theme1');

  return (
    <div className={`App ${selectedTheme}`}>
    <PomodoroTimer
      selectedTheme={selectedTheme}
    />
  </div>
  );
}

export default App;
