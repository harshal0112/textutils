import PropTypes from 'prop-types'
import Themes from "./Themes";
import { NavLink, Link } from "react-router-dom";
import React, {useContext, useState, useEffect} from 'react';
import { MyContext } from './MyContextProvider';

function Navbar(props) {
  const [search, setSearch] = useState('');
  const {setSearchText} = useContext(MyContext);
  useEffect(() => {
    setSearchText(search);
    
  }, [setSearchText, search])

const reset3 = ()=> {
    document.getElementById('reset3').value = '';
    setSearch('')
}

    return(
        <>
<nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className={`navbar-brand text-${props.theme}`} to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i className={`bi bi-list text-${props.theme}`} style={{fontSize: '25px'}}></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/faq">FAQ</NavLink>
        </li>
      </ul>
      <Themes toggleMode={props.toggleMode} theme={props.theme} toggleTheme={props.toggleTheme} mode={props.mode} />
      <form className="d-flex mt-sm-2 mt-lg-0" role="search">
        <input className={`form-control me-2 border-${props.theme}`} id='reset3' style={{backgroundColor: props.mode=== 'dark'?'#212529': 'white', color: props.mode === 'dark'?'white':'black'}} value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
        <button className={`btn btn-${props.theme}`} onClick={reset3} type="button">{search?'Reset': 'Search'}</button>
      </form>
    </div>
  </div>
</nav>
        </>
    );
}

Navbar.propTypes = {title: PropTypes.string,
                    aboutText: PropTypes.string}

Navbar.defaultProps = {
                        title: "Title here",
                        aboutText: "About text here"
}

export default Navbar;