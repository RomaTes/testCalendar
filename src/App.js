import './App.css';
import CalendarComp from './components/calendar';
import React from 'react';

function App() {
  React.useEffect(() => {
    console.log("B");
   }, []);
  return (
    <div className="App">
      <CalendarComp/>
    </div>
  );
}

export default App;
