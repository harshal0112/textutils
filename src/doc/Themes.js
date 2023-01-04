import React from 'react'

export default function Themes(props) {
  return (
    <>
    <label className={`form-check-label text-${props.mode === 'dark'?'light':'dark'}`} htmlFor="btn-check-outlined">{props.mode === 'dark'?'Light':''} &nbsp;</label>
    <div className="form-check form-switch form-check-inline">
        <input className="form-check-input" onChange={props.toggleMode} type="checkbox" role="switch" name='flexDefault' id="btn-check-outlined" value="option1" defaultChecked={props.mode === 'dark'}/>
        <label className={`form-check-label text-${props.mode === 'dark'?'light':'dark'}`} htmlFor="btn-check-outlined">{props.mode === 'light'?'Dark':''}</label>
    </div>
    <div className="dropdown mx-sm-0 mx-lg-3 form-check-inline" data-bs-theme={props.mode}>
        <button class={`btn btn-sm btn-${props.mode} dropdown-toggle text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            Theme
        </button>

        <ul className="dropdown-menu">
            <li><a className="dropdown-item drop-primary" onClick={(e) => props.toggleTheme("primary")}>Default (Blue)</a></li>
            <li><a className="dropdown-item drop-success" onClick={(e) => props.toggleTheme("success")}>Green</a></li>
            <li><a className="dropdown-item drop-warning" onClick={(e) => props.toggleTheme("warning")}>Yellow</a></li>
            <li><a className="dropdown-item drop-danger" onClick={(e) => props.toggleTheme("danger")}>Red</a></li>
        </ul>
    </div>
    </>
  )
}
