import './App.css';
import Navbar from './doc/Navbar';
import TextForm from './doc/TextForm';
import React, { useState } from 'react';
import Alert from './doc/Alert';
import About from './doc/About';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState('primary');
  const [modeName, setModeName] = useState('Dark');

  const showAlert = (message, type)=> {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = ()=> {
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = "#0f0f0f";
      showAlert('Dark mode had been enabled', 'success');
      setModeName('Light');
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = "white";
      showAlert('Light mode had been enabled', 'success');
      setModeName('Dark');
    }
  }

  const toggleTheme = (event)=> {
    setTheme(event)
  }

  return (
   <>
   <Router>
    <Navbar title="TextUtils" aboutText="About" modeName={modeName} theme={theme} mode={mode} toggleMode={toggleMode} toggleTheme={toggleTheme}/>
      <Alert  alert={alert}/>
      <div className='container my-3'>
          <Routes>
            <Route path="/about" element={<About mode={mode} theme={theme}/>} />
            <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter your text to Analyze." mode={mode} theme={theme}/>}/>
          </Routes>
        {/* <About mode={mode} theme={theme}/> */}
        {/* <TextForm showAlert={showAlert} heading="Enter your text to Analyze." mode={mode} theme={theme}/> */}
      </div>
   </Router>
   </>
  );
}

export default App;
