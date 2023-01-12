import React, { useState } from "react";

function Footer(props) {
  const [heart, setHeart] = useState("");
  const heartToggle = () => {
    if (heart === "") {
      console.log("ggg");
      setHeart("beating");
    } else {
      console.log("nnn");
      setHeart("");
    }
  };
  return (
    <>
      <footer
        className={`footer d-flex flex-wrap justify-content-between align-items-center py-3 bg-${props.mode}`}
      >
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div
            className={`col-md-4 d-flex align-items-center text-${
              props.mode === "dark" ? "light" : "muted"
            }`}
          >
            <div
              className={`mb-3 me-2 mb-md-0 text-decoration-none lh-1 cursor-pointer ${
                heart === "beating" ? "heart-icon text-danger" : ""
              }`}
              onClick={heartToggle}
            >
              <i className="bi bi-heart-fill" width="30" height="24"></i>
            </div>
            <span
              className={`mb-3 mb-md-0 text-${
                props.mode === "dark" ? "light" : "muted"
              }`}
            >
              © 2023 Harshal, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className={`text-${props.mode === "dark" ? "light" : "muted"}`}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/harshal0112"
              >
                <i className="bi bi-github"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className={`text-${props.mode === "dark" ? "light" : "muted"}`}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/iam__Harshal"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className={`text-${props.mode === "dark" ? "light" : "muted"}`}
                target="_blank"
                rel="noreferrer"
                href="/"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
