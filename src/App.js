import "./App.css";
import Navbar from "./doc/Navbar";
import TextForm from "./doc/TextForm";
import React, { useEffect, useMemo, useState } from "react";
import Alert from "./doc/Alert";
import FAQ from "./doc/FAQ";
import About from "./doc/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyContextProvider from "./doc/MyContextProvider";
import Footer from "./doc/Footer";

function App() {
  const [toast, setToast] = useState(null);
  const getActiveMode = () => {
    return JSON.parse(localStorage.getItem("activeMode")) || "Auto";
  };
  const [modeActive, setModeActive] = useState(getActiveMode);

  const showToast = (type, message) => {
    setToast({
      type: type,
      msg: message,
    });

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const stateMode = useMemo(() => {
    if (localStorage.getItem("mode") !== null || undefined) {
      return JSON.parse(localStorage.getItem("mode"));
    } else {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        // Theme set to dark.
        setModeActive("Auto");
        showToast(
          "Dark Mode",
          "Dark mode has been enabled, accordance to device's system theme settings."
        );
        return "dark";
      } else {
        // Theme set to light.
        setModeActive("Auto");
        showToast(
          "Light Mode",
          "Light mode has been enabled, accordance to device's system theme settings."
        );
        return "light";
      }
    }
  }, []);

  const autoDetectMode = () => {
    document.getElementById("dropShow").classList.remove("show");
    document.getElementById("toggleMode").classList.remove("show");
    const darkThemeMqK = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMqK.matches) {
      // Theme set to dark.
      setModeActive("Auto");
      setMode("dark");
      showAlert(
        "Dark mode has been enabled, accordance to device's system theme settings.",
        "Dark Mode"
      );
      return "dark";
    } else {
      // Theme set to light.
      setModeActive("Auto");
      setMode("light");
      showAlert(
        "Light mode has been enabled, accordance to device's system theme settings.",
        "Light Mode"
      );
      return "light";
    }
  };

  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || "purple";
  };

  const stateTheme = getTheme();

  const [mode, setMode] = useState(stateMode);
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState(stateTheme);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
    localStorage.setItem("activeMode", JSON.stringify(modeActive));
  }, [mode, modeActive]);

  if (mode === "dark") {
    document.body.style.backgroundColor = "#0f0f0f";
  } else {
    document.body.style.backgroundColor = "white";
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = (event) => {
    document.getElementById("toggleMode").classList.remove("show");
    setMode(event);
    setModeActive(event);
    document.getElementById("dropShow").classList.remove("show");
    if (event === "light") {
      document.body.style.backgroundColor = "#0f0f0f";
      showAlert("Light mode had been enabled", "success");
    } else {
      document.body.style.backgroundColor = "white";
      showAlert("Dark mode had been enabled", "success");
    }
  };

  const toggleTheme = (event) => {
    setTheme(event);
  };

  return (
    <>
      <MyContextProvider>
        <Router>
          <Navbar
            title="TextUtils"
            theme={theme}
            mode={mode}
            toggleMode={toggleMode}
            toggleTheme={toggleTheme}
            modeActive={modeActive}
            autoDetectMode={autoDetectMode}
          />
          <Alert alert={alert} theme={theme} toast={toast} mode={mode} />
          <div
            className={`container my-3 mb-5 pt-3 pb-5 shadow rounded`}
            data-bs-theme={mode}
          >
            <Routes>
              <Route
                exact
                path="/About"
                element={<About mode={mode} theme={theme} />}
              />
              <Route
                exact
                path="/FAQ"
                element={<FAQ mode={mode} theme={theme} />}
              />
              <Route
                path="/"
                element={
                  <TextForm
                    showAlert={showAlert}
                    heading="Enter your text to Analyze."
                    mode={mode}
                    theme={theme}
                  />
                }
              />
            </Routes>
            {/* <About mode={mode} theme={theme}/> */}
            {/* <TextForm showAlert={showAlert} heading="Enter your text to Analyze." mode={mode} theme={theme}/> */}
          </div>
          <Footer theme={theme} mode={mode} />
        </Router>
      </MyContextProvider>
    </>
  );
}

export default App;
