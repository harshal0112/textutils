import PropTypes from "prop-types";
import Themes from "./Themes";
import { NavLink, Link } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./MyContextProvider";
import { kMaxLength } from "buffer";

function Navbar(props) {
  const [search, setSearch] = useState("");
  const { setSearchText } = useContext(MyContext);
  const [screenWidth, setScreenWidth] = useState("Large");
  const { mainText } = useContext(MyContext);
  const { textFoundCount } = useContext(MyContext);
  useEffect(() => {
    setSearchText(search);
  }, [setSearchText, search]);

  const reset3 = () => {
    document.getElementById("reset3").value = "";
    setSearch("");
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  function handleExpand(event) {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
    inputRef.current.focus();
    inputRef.current.select();
    if (window.innerWidth < 460) {
      setScreenWidth("Small");
    }
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".search-container")) {
      setIsExpanded(false);
      setScreenWidth("Large");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div
          className={`container-fluid d-flex justify-content-${
            screenWidth === "Large" ? "between" : "center"
          }`}
        >
          <Link
            className={`navbar-brand text-${props.theme} ${
              screenWidth === "Large" ? "" : "d-none"
            }`}
            to="/"
          >
            {props.title}
          </Link>
          <div className="d-flex align-items-center d-lg-none">
            <div className="search-container d-flex align-items-center">
              <div
                className={`border-0 search-icon me-3 ms-0 ${
                  isExpanded ? "hide-icon" : ""
                }`}
                onClick={handleExpand}
              >
                <i
                  className={`bi bi-search text-${
                    props.mode === "light" ? "dark" : "light"
                  }`}
                ></i>
              </div>
              <form
                className={`d-flex align-items-center mt-lg-0 ${
                  isExpanded ? "input-show" : "input-hide"
                }`}
                role="search"
                onSubmit={handleSubmit}
                data-bs-theme={props.mode}
              >
                <input
                  className={`form-control search-bar-sm me-2 border-${
                    props.theme
                  } ${!mainText && search ? "is-invalid" : ""} ${
                    mainText && search ? "is-valid" : ""
                  }`}
                  id="reset3"
                  ref={inputRef}
                  style={{
                    backgroundColor:
                      props.mode === "dark" ? "#111111" : "white",
                    color: props.mode === "dark" ? "white" : "black",
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <p className="invalid-tooltip mt-auto">
                  <small className="">Search after entering text Below.</small>
                </p>
                <p className="valid-tooltip">
                  <small className="">
                    {textFoundCount}{" "}
                    {textFoundCount === 1 ? "Match" : "Matches"} Found
                  </small>
                </p>
              </form>
            </div>
            <div
              className={`form-check-inline d-sm-block d-lg-none ${
                props.mode === "dark" ? "dark" : "light"
              } ${screenWidth === "Large" ? "" : "d-none"}`}
              data-bs-theme={props.mode}
            >
              <input type="checkbox" onChange={props.toggleMode} id="toggle" />
              <label className="toggle shadow-sm" htmlFor="toggle">
                <i
                  className={`bi bi-${
                    props.mode === "dark" ? "sun" : "sun-fill"
                  }`}
                ></i>
                <i
                  className={`bi bi-${
                    props.mode === "dark" ? "moon-fill" : "moon"
                  }`}
                ></i>
                <span className={`ball bg-${props.theme}`}></span>
              </label>
            </div>
            <button
              className={`navbar-toggler ${
                screenWidth === "Large" ? "" : "d-none"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i
                className={`bi bi-list text-${props.theme}`}
                style={{ fontSize: "25px" }}
              ></i>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/faq">
                  FAQ
                </NavLink>
              </li>
            </ul>
            {/* <div
              className={`form-check-inline d-sm-none d-lg-block ${
                props.mode === "dark" ? "dark" : "light"
              }`}
              data-bs-theme={props.mode}
            >
              <input type="checkbox" onChange={props.toggleMode} id="toggle" />
              <label className="toggle shadow-sm" htmlFor="toggle">
                <i
                  className={`bi bi-${
                    props.mode === "dark" ? "sun" : "sun-fill"
                  }`}
                ></i>
                <i
                  className={`bi bi-${
                    props.mode === "dark" ? "moon-fill" : "moon"
                  }`}
                ></i>
                <span className={`ball bg-${props.theme}`}></span>
              </label>
            </div> */}
            <div
              className="dropdown mr-sm-3 mr-lg-3 form-check-inline"
              data-bs-theme={props.mode}
            >
              <div
                className={`dropdown-toggle drop-mode text-${
                  props.mode === "dark" ? "light" : "dark"
                }`}
                id="toggleMode"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="true"
              >
                <i
                  className={`bi bi-${
                    props.mode === "dark" ? "moon-stars-fill" : "sun-fill"
                  }`}
                ></i>
                <span className="d-lg-none ms-2">Toggle theme</span>
              </div>

              <ul
                className="dropdown-menu shadow"
                aria-labelledby="toggleMode"
                style={{ minWidth: "120px" }}
                id="dropShow"
              >
                <li className="d-flex justify-content-center">
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center drop-mode-item ${
                      props.modeActive === "light" ? "active" : ""
                    }`}
                    style={{ maxWidth: "94%", marginBottom: "1px" }}
                    onClick={() => props.toggleMode("light")}
                  >
                    <small>
                      <i
                        className={`me-2 bi bi-sun-fill
                  }`}
                      ></i>{" "}
                      Light
                    </small>
                  </button>
                </li>
                <li className="d-flex justify-content-center">
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center drop-mode-item ${
                      props.modeActive === "dark" ? "active" : ""
                    }`}
                    style={{ maxWidth: "94%", marginBottom: "1px" }}
                    onClick={() => props.toggleMode("dark")}
                  >
                    <small>
                      <i
                        className={`me-2 bi bi-moon-stars-fill
                  }`}
                      ></i>{" "}
                      Dark
                    </small>
                  </button>
                </li>
                <li className="d-flex justify-content-center">
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center drop-mode-item ${
                      props.modeActive === "Auto" ? "active" : ""
                    }`}
                    style={{ maxWidth: "94%" }}
                    onClick={() => props.autoDetectMode()}
                  >
                    <small>
                      <i
                        className={`me-2 fa fa-desktop
                  }`}
                      ></i>{" "}
                      Auto
                    </small>
                  </button>
                </li>
              </ul>
            </div>
            <div className="btn p-0 m-0 border-0">
              <Themes
                toggleMode={props.toggleMode}
                theme={props.theme}
                toggleTheme={props.toggleTheme}
                mode={props.mode}
              />
            </div>
            <form
              className="d-flex align-items-center mt-sm-2 mt-lg-0"
              role="search"
              onSubmit={handleSubmit}
              data-bs-theme={props.mode}
            >
              <input
                className={`form-control d-sm-none d-lg-block me-2 border-${
                  props.theme
                } ${!mainText && search ? "is-invalid" : ""} ${
                  mainText && search ? "is-valid" : ""
                }`}
                id="reset3"
                style={{
                  backgroundColor: props.mode === "dark" ? "#111111" : "white",
                  color: props.mode === "dark" ? "white" : "black",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <p className="invalid-tooltip mt-auto">
                <small className="">Search after entering text Below.</small>
              </p>
              <p className="valid-tooltip">
                <small className="">
                  {textFoundCount} {textFoundCount === 1 ? "Match" : "Matches"}{" "}
                  Found
                </small>
              </p>
              <button
                className={`btn btn-${props.theme} d-sm-none d-lg-block`}
                onClick={reset3}
                type="button"
              >
                {search ? "Reset" : "Search"}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = { title: PropTypes.string, aboutText: PropTypes.string };

Navbar.defaultProps = {
  title: "Title here",
  aboutText: "About text here",
};

export default Navbar;
