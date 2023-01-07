import React from "react";

export default function Themes(props) {
  return (
    <>
      <div
        className="dropdown mr-sm-3 mr-lg-3 form-check-inline"
        data-bs-theme={props.mode}
      >
        <div
          className={`theme-menu dropdown-toggle text-${
            props.mode === "dark" ? "light" : "dark"
          }`}
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          Theme
        </div>

        <ul className="dropdown-menu shadow">
          <li>
            <button
              type="button"
              className="dropdown-item drop-purple"
              onClick={(e) => props.toggleTheme("purple")}
            >
              Default (Purple)
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item drop-primary"
              onClick={(e) => props.toggleTheme("primary")}
            >
              Blue
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item drop-success"
              onClick={(e) => props.toggleTheme("success")}
            >
              Green
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item drop-warning"
              onClick={(e) => props.toggleTheme("warning")}
            >
              Yellow
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item drop-danger"
              onClick={(e) => props.toggleTheme("danger")}
            >
              Red
            </button>
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item drop-cyan"
              onClick={(e) => props.toggleTheme("info")}
            >
              Cyan
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
