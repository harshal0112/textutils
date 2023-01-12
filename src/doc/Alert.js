import React, { useState } from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const [toastErase, setToastErase] = useState(true);
  const toastClear = () => {
    setToastErase(false);
  };

  return (
    <div>
      <div style={{ height: "45px" }} className="container">
        {props.alert && (
          <div
            className={`alert alert-${props.theme} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </div>
        )}
      </div>
      <div>
        {props.toast && toastErase && (
          <div className="toast-container position-fixed bottom-0 end-0 p-3 d-block fade show">
            <div
              id="liveToast"
              className="toast d-block"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-bs-theme={props.mode}
            >
              <div className="toast-header">
                <div
                  className="rounded me-2 bg-primary"
                  style={{ height: "10px", width: "10px" }}
                ></div>
                <strong className="me-auto">{props.toast.type}</strong>
                <small>Just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={toastClear}
                ></button>
              </div>
              <div
                className="toast-body"
                style={
                  props.mode === "dark" ? { color: "#8a9198" } : { color: "" }
                }
              >
                {props.toast.msg}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
