import React, {useRef} from 'react'

function ReplaceX(props) {
    const replaceInput = useRef(null);

    const handleReplaceInput = ()=> {
        props.setInputText(replaceInput.current.value);
    }

    const replaceWith = useRef(null);

    const handleReplaceWith = ()=> {
        props.setInputReplace(replaceWith.current.value);
    }

  return (
    <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-r">
            <div className={`modal-content bg-${props.mode}`}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Replace Text</h1>
                <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><i className={`bi bi-x-lg text-${props.theme}`}></i></button>
            </div>
            <form className="modal-body d-flex justify-content-center" id='replace-text'>
                <input className={`mx-1 form-control border-${props.theme}`} ref={replaceInput} onChange={handleReplaceInput} style={{backgroundColor: props.mode=== 'dark'?'black': 'white', color: props.mode === 'dark'?'white':'black'}} type="text" placeholder='Text' />
                <input className={`mx-1 form-control border-${props.theme}`} ref={replaceWith} onChange={handleReplaceWith} style={{backgroundColor: props.mode=== 'dark'?'black': 'white', color: props.mode === 'dark'?'white':'black'}} type="text" placeholder='Replace with' />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className={`btn btn-${props.theme}`} data-bs-dismiss="modal" onClick={props.handleReplace}>Replace</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ReplaceX