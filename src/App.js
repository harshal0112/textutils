import './App.css';
import Navbar from './doc/Navbar';
import TextForm from './doc/TextForm';
import React, { useEffect, useState } from 'react';
import Alert from './doc/Alert';
import FAQ from './doc/FAQ';
import About from './doc/About';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MyContextProvider from './doc/MyContextProvider';
import Footer from './doc/Footer';

function App() {

  const getMode = ()=> {
    return JSON.parse(localStorage.getItem('mode')) || 'light';
  }

  const getTheme = ()=> {
    return JSON.parse(localStorage.getItem('theme')) || 'purple'
  }

  const [mode, setMode] = useState(getMode());
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);
  
  if (mode === 'dark') {
    document.body.style.backgroundColor = "#0f0f0f";
  }
  else {
    document.body.style.backgroundColor = "white";
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

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
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = "white";
      showAlert('Light mode had been enabled', 'success');
    }
  }

  const toggleTheme = (event)=> {
    setTheme(event)
  }


  return (
   <>
   <MyContextProvider>
   <Router>
    <Navbar title="TextUtils" theme={theme} mode={mode} toggleMode={toggleMode} toggleTheme={toggleTheme}/>
      <Alert  alert={alert} theme={theme}/>
      <div className={`container my-3 pt-3 pb-5 shadow rounded`} data-bs-theme={mode}>
          <Routes>
            <Route exact path="/About" element={<About mode={mode} theme={theme}/>} />
            <Route exact path="/FAQ" element={<FAQ mode={mode} theme={theme}/>} />
            <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter your text to Analyze." mode={mode} theme={theme}/>}/>
          </Routes>
        {/* <About mode={mode} theme={theme}/> */}
        {/* <TextForm showAlert={showAlert} heading="Enter your text to Analyze." mode={mode} theme={theme}/> */}
      </div>
      <Footer theme={theme} mode={mode}/>
   </Router>
   </MyContextProvider>
   </>
  );
}

export default App;
