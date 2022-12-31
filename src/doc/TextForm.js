import React, {useState, useRef} from 'react'
import Find from './Find';
import Replace from './Replace';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const undoStack = useRef([]);
    const redoStack = useRef([]);
    console.log("Undo =",undoStack.current.length);
    console.log("Redo",redoStack.current.length);

    const handleOnChange = (event)=>{
        const {value} = event.target;
        undoStack.current.push(value);
        redoStack.current = [];
        setText(event.target.value);
    }

    const handleUndo = () => {
        if (undoStack.current.length > 1) {
          let undo = undoStack.current.pop()
          if (undo.at(-1) === "Ü"){
            undo = undo.slice(0, -1);
            setText(undo)
          }
          else
          {
            redoStack.current.push(undo)
            setText(undoStack.current[undoStack.current.length - 1]);
          }
        }
        else if (undoStack.current.length === 1) {
          setText("");
          redoStack.current.push(undoStack.current.pop());
        }
      }
    
      const handleRedo = () => {
        if (redoStack.current.length > 0) {
          const redo = redoStack.current.pop();
          if (redo === "Ü")
          {
            undoStack.current.push("");
          }
          else {
            undoStack.current.push(redo);
          }
          setText(undoStack.current[undoStack.current.length - 1]);
        }
      };

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        undoStack.current.push(text+"Ü");
        setText(newText);
        props.showAlert('Text Converted to UpperCase.', 'success');
    }

    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        undoStack.current.push(text+"Ü");
        setText(newText);
        props.showAlert('Text Converted to LowerCase.', 'success');
    }

    const handleClearClick = ()=>{
        let newText = "";
        undoStack.current.push(text+"Ü");
        redoStack.current.length = 0;
        setText(newText);
        props.showAlert('Text Cleared.', 'success');
    }

    const handleCopy = ()=> {
        navigator.clipboard.writeText(text);
        props.showAlert('Text Copied to Clipboard.', 'success');
    }

    const handlePaste = async () => {
      try {
        const data = await navigator.clipboard.readText();
        setText(text + data);
        undoStack.current.push(text+"Ü");
      } catch (error) {
        console.error(error);
      }
    };

    const handleExtraSpaces = ()=> {
        let newText = text.split(/[ ]+/);
        undoStack.current.push(text+"Ü");
        setText(newText.join(" "));
        props.showAlert('Extra Spaces Removed.', 'success');
    }

    const reset = ()=> {
      document.getElementById('replace-text').reset();
    }
    const reset2 = ()=> {
    document.getElementById('replace-text2').reset();
    }

    const [inputText, setInputText] = useState(null);
    const [inputReplace, setInputReplace] = useState(null);

    // const printInput = ()=> {
    //   console.log(inputText, inputReplace)
    // }

    const handleReplace = () => {
      if (text.indexOf(inputText) === -1) {
        props.showAlert(`"${inputText}" Not Found in TextBox.`, 'error');
      } else {
        const newText = text.replace(new RegExp(inputText, 'g'), inputReplace);
        setText(newText);
      }
    };

  return (
    <>
    <div className='container' style={{color: props.mode=== 'dark'?'white': 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea className={`form-control border-${props.theme}`} style={{backgroundColor: props.mode=== 'dark'?'#212529': 'white', color: props.mode === 'dark'?'white':'black'}} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text === text.toUpperCase()} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleUpClick}>Convert to UpperCase</button>
        <button disabled={text === text.toLowerCase()} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleLoClick}>Convert to LowerCase</button>
        <button disabled={text.length === 0} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length === 0} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleCopy}>Copy Text</button>
        <button className={`btn btn-${props.theme} mx-1 my-1`} onClick={handlePaste}>Paste from clipboard</button>
        <button disabled={text.match(/^.*\s{2,}.*$/) === null} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button disabled={undoStack.current.length === 0} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleUndo}>Undo</button>
        <button disabled={redoStack.current.length === 0} className={`btn btn-${props.theme} mx-1 my-1`} onClick={handleRedo}>Redo</button>
        <button type="button" disabled={text.length === 0} onClick={reset} className={`btn btn-${props.theme} mx-1 my-1`} data-bs-toggle="modal" data-bs-target="#exampleModal">Replace</button>
        <button type="button" disabled={text.length === 0} onClick={reset2} className={`btn btn-${props.theme} mx-1 my-1`} data-bs-toggle="modal" data-bs-target="#exampleModal2">Find</button>

        {/* --------------------------------------------------------- */}
        <Replace theme={props.theme} mode={props.mode} inputText={inputText} setInputText={setInputText} inputReplace={inputReplace} setInputReplace={setInputReplace} handleReplace={handleReplace}/>
        <Find theme={props.theme} mode={props.mode} />
    </div>
    <div className='container my-3' style={{color: props.mode=== 'dark'?'white': 'black'}}>
        <h2>Your text Summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} words and {text.length} characters</p>
        <p>{0.008* text.split(" ").filter((element)=>{return element.length !== 0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview."}</p>
    </div>
    </>
  )
}
