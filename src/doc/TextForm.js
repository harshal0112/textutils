import React, {useState} from 'react'

export default function TextForm(props) {

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('Text Converted to UpperCase.', 'success');
    }

    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('Text Converted to LowerCase.', 'success');
    }

    const handleClearClick = ()=>{
        let newText = "";
        setText(newText);
        props.showAlert('Text Cleared.', 'success');
    }

    const handleCopy = ()=> {
        let text = document.getElementById('myBox');
        text.select();
        text.setSelectionRange(0, 9999);
        navigator.clipboard.writeText(text.value);
        props.showAlert('Text Copied to Clipboard.', 'success');
    }

    const handleExtraSpaces = ()=> {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert('Extra Spaces Removed.', 'success');
    }

    const handleOnChange = (event)=>{
        setText(event.target.value)
    }

    const [text, setText] = useState('');
  return (
    <>
    <div className='container' style={{color: props.mode=== 'dark'?'white': 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea className={`form-control border-${props.theme}`} style={{backgroundColor: props.mode=== 'dark'?'#212529': 'white', color: props.mode === 'dark'?'white':'black'}} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleUpClick}>Convert to UpperCase</button>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleLoClick}>Convert to LowerCase</button>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleClearClick}>Clear Text</button>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleCopy}>Copy Text</button>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    </div>
    <div className='container my-3' style={{color: props.mode=== 'dark'?'white': 'black'}}>
        <h2>Your text Summary</h2>
        <p>{text.split(" ").filter((element)=>{return element.length !== 0}).length} words and {text.length} characters</p>
        <p>{0.008* text.split(" ").filter((element)=>{return element.length !== 0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the TextBox above to Preview it Here."}</p>
    </div>
    </>
  )
}
