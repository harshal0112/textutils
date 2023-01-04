import React from 'react'

function Footer(props) {
  return (
    <div>
            <footer className={`d-flex flex-wrap justify-content-between align-items-center py-3 mt-5 bg-${props.mode}`}>
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <i className="bi bi-heart-fill" width="30" height="24"></i>
                </a>
                <span className={`mb-3 mb-md-0 text-${props.mode === 'dark'?'light':'muted'}`}>© 2023 Harshal, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className={`text-${props.mode === 'dark'?'light':'muted'}`} target="_blank" href="https://github.com/harshal0112"><i className="bi bi-github"></i></a></li>
                <li className="ms-3"><a className={`text-${props.mode === 'dark'?'light':'muted'}`} target="_blank" href="https://twitter.com/iam__Harshal"><i className="bi bi-twitter"></i></a></li>
                <li className="ms-3"><a className={`text-${props.mode === 'dark'?'light':'muted'}`} target="_blank" href="/"><i className="bi bi-instagram"></i></a></li>
                </ul>
        </div>
            </footer>
    </div>
  )
}

export default Footer