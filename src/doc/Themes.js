import React from 'react'

export default function Themes(props) {
  return (
    <>
    <label className={`form-check-label text-${props.mode === 'dark'?'light':'dark'}`} htmlFor="btn-check-outlined">{props.mode === 'dark'?'Light':''} &nbsp;</label>
    <div className="form-check form-switch form-check-inline">
        <input className="form-check-input" onChange={props.toggleMode} type="checkbox" role="switch" name='flexDefault' id="btn-check-outlined" value="option1" checked={props.mode === 'dark'}/>
        <label className={`form-check-label text-${props.mode === 'dark'?'light':'dark'}`} htmlFor="btn-check-outlined">{props.mode === 'light'?'Dark':''}</label>
    </div>
    <div className="form-check form-check-inline ml-0 mb-sm-2 mb-md-2 mb-lg-0 mx-0">
        <input className="btn-check" value="primary" onClick={(e) => props.toggleTheme(e.target.value)} type="radio" name='flexDefault' id="btn-check-outlined1" autoComplete='off' defaultChecked/>
        <label className="btn btn-outline-primary" htmlFor="btn-check-outlined1"></label>
    </div>
    <div className="form-check form-check-inline mx-0">
        <input className="btn-check" value="success" onClick={(e) => props.toggleTheme(e.target.value)} type="radio" name='flexDefault' id="btn-check-outlined2" autoComplete='off' />
        <label className="btn btn-outline-success" htmlFor="btn-check-outlined2"></label>
    </div>
    <div className="form-check form-check-inline mx-0">
        <input className="btn-check" value="warning" onClick={(e) => props.toggleTheme(e.target.value)} type="radio" name='flexDefault' id="btn-check-outlined4" autoComplete='off'/>
        <label className="btn btn-outline-warning" htmlFor="btn-check-outlined4"></label>
    </div>
    <div className="form-check form-check-inline mr-2">
        <input className="btn-check" value="danger" onClick={(e) => props.toggleTheme(e.target.value)} type="radio" name='flexDefault' id="btn-check-outlined5" autoComplete='off'/>
        <label className="btn btn-outline-danger" htmlFor="btn-check-outlined5"></label>
    </div>
    </>
  )
}
