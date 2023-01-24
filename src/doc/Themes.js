import React from "react";

export default function Themes(props) {
  return (
    <>
      <div
        className="dropdown mr-sm-3 mr-lg-3 navbar-nav form-check-inline"
        data-bs-theme={props.mode}
      >
        <div
          className={`theme-menu dropdown-toggle text-${
            props.mode === "dark" ? "light" : "dark"
          }`}
          id="theme-toggler"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="true"
        >
          Theme
        </div>

        <ul className="dropdown-menu shadow" aria-labelledby="theme-toggler">
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-purple ${
                props.theme === "purple" ? "active active-purple" : ""
              }`}
              onClick={(e) => props.toggleTheme("purple")}
            >
              <small>Default (Purple)</small>
            </button>
          </li>
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-primary ${
                props.theme === "primary" ? "active active-primary" : ""
              }`}
              onClick={(e) => props.toggleTheme("primary")}
            >
              <small>Blue</small>
            </button>
          </li>
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-success ${
                props.theme === "success" ? "active active-success" : ""
              }`}
              onClick={(e) => props.toggleTheme("success")}
            >
              <small>Green</small>
            </button>
          </li>
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-warning ${
                props.theme === "warning" ? "active active-warning" : ""
              }`}
              onClick={(e) => props.toggleTheme("warning")}
            >
              <small>Yellow</small>
            </button>
          </li>
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-danger ${
                props.theme === "danger" ? "active active-danger" : ""
              }`}
              onClick={(e) => props.toggleTheme("danger")}
            >
              <small>Red</small>
            </button>
          </li>
          <li className="d-flex justify-content-center">
            <button
              type="button"
              className={`dropdown-item drop-cyan ${
                props.theme === "info" ? "active active-info" : ""
              }`}
              onClick={(e) => props.toggleTheme("info")}
            >
              <small>Cyan</small>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
