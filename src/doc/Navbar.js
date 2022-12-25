import PropTypes from 'prop-types'
import Themes from "./Themes";
import { Link } from "react-router-dom";

function Navbar(props) {

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
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">{props.aboutText}</Link>
        </li>
      </ul>
      <Themes toggleMode={props.toggleMode} toggleTheme={props.toggleTheme} mode={props.mode} modeName={props.modeName}/>
      <form className="d-flex" role="search">
        <input className={`form-control me-2 border-${props.theme}`} style={{backgroundColor: props.mode=== 'dark'?'#212529': 'white', color: props.mode === 'dark'?'white':'black'}} type="search" placeholder="Search" aria-label="Search" />
        <button className={`btn btn-${props.theme}`} type="submit">Search</button>
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