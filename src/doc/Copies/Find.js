import React from 'react'

function Find(props) {
  return (
    <div>
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
            <div className={`modal-content bg-${props.mode}`}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel2">Find Text</h1>
                <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><i className={`bi bi-x-lg text-${props.theme}`}></i></button>
            </div>
            <form className="modal-body d-flex justify-content-center" id='replace-text2'>
                <input className={`mx-1 form-control border-${props.theme}`} style={{backgroundColor: props.mode=== 'dark'?'black': 'white', color: props.mode === 'dark'?'white':'black'}} type="text" placeholder='Enter Text to find' />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className={`btn btn-${props.theme}`}>Find</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Find;