import React, { useState, useEffect } from "react";

function ToastNotification(props) {
  const [show, setShow] = useState(props.toast);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div
        className={`toast-container position-fixed bottom-0 end-0 p-3 ${
          show ? "d-block" : "d-none"
        }`}
      >
        <div
          id="liveToast"
          className={`toast d-block`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-theme={props.mode}
        >
          <div className="toast-header">
            <div
              className={`rounded me-2 bg-${props.theme}`}
              style={{ height: "15px", width: "15px" }}
            ></div>
            <strong className="me-auto">Dark Mode</strong>
            <small>Just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div
            className="toast-body"
            style={props.mode === "dark" ? { color: "#8a9198" } : { color: "" }}
          >
            Dark mode has been enabled, accordance to device's system theme
            settings.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;
