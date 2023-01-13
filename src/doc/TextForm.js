import React, { useState, useRef, useEffect, useCallback } from "react";
// import Find from './Find';
import ReplaceX from "./ReplaceX";
import { useContext } from "react";
import { MyContext } from "./MyContextProvider";
import { Buffer } from "buffer";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const textRef = useRef(null);
  const { setMainText } = useContext(MyContext);
  const foundArray = [];
  const [foundCount, setFoundCount] = useState(0);
  const { setTextFoundCount } = useContext(MyContext);
  const { searchText } = useContext(MyContext);
  // -----------------------------------------------------

  useEffect(() => {
    setMainText(text);
  }, [setMainText, text]);

  useEffect(() => {
    setTextFoundCount(foundCount);
  }, [setTextFoundCount, foundCount]);

  let mic;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = "en-US";
  }

  const [isListening, setIsListening] = useState(false);

  const handleListen = useCallback(() => {
    if (!mic) {
      return;
    }
    if (isListening) {
      mic.start();
      // console.log('start');
    } else {
      mic.stop();
      // console.log('stopped');
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(text + transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }, [isListening]);

  useEffect(() => {
    handleListen();
  }, [handleListen]);

  const handleToggleListen = () => {
    setIsListening(!isListening);
  };
  // ------------------------------------------------------
  const handleOnChange = (event) => {
    const { value } = event.target;
    undoStack.current.push(value);
    redoStack.current = [];
    setText(event.target.value);
  };

  const handleUndo = () => {
    if (undoStack.current.length > 1) {
      let undo = undoStack.current.pop();
      if (undo.at(-1) === "Ü") {
        undo = undo.slice(0, -1);
        setText(undo);
      } else {
        redoStack.current.push(undo);
        setText(undoStack.current[undoStack.current.length - 1]);
      }
    } else if (undoStack.current.length === 1) {
      setText("");
      redoStack.current.push(undoStack.current.pop());
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      const redo = redoStack.current.pop();
      if (redo === "Ü") {
        undoStack.current.push("");
      } else {
        undoStack.current.push(redo);
      }
      setText(undoStack.current[undoStack.current.length - 1]);
    }
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    undoStack.current.push(text + "Ü");
    setText(newText);
    props.showAlert("Text Converted to UpperCase.", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    undoStack.current.push(text + "Ü");
    setText(newText);
    props.showAlert("Text Converted to LowerCase.", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    undoStack.current.push(text + "Ü");
    redoStack.current.length = 0;
    setText(newText);
    props.showAlert("Text Cleared.", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied to Clipboard.", "success");
  };

  const handlePaste = async () => {
    try {
      const data = await navigator.clipboard.readText();
      setText(text + data);
      undoStack.current.push(text + "Ü");
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    undoStack.current.push(text + "Ü");
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed.", "success");
  };

  const reset = () => {
    document.getElementById("replace-text").reset();
  };
  // const reset2 = ()=> {
  // document.getElementById('replace-text2').reset();
  // }

  const [inputText, setInputText] = useState(null);
  const [inputReplace, setInputReplace] = useState(null);

  // const printInput = ()=> {
  //   console.log(inputText, inputReplace)
  // }

  const handleReplace = () => {
    if (text.indexOf(inputText) === -1) {
      props.showAlert(`"${inputText}" Not Found in TextBox.`, "error");
    } else {
      const newText = text.replace(new RegExp(inputText, "gi"), inputReplace);
      setText(newText);
    }
  };

  const highlight = (text, search) => {
    // Escape the search term to avoid errors
    const escapedSearch = search?.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map(
          (part, i) =>
            part?.toLowerCase() === search?.toLowerCase()
              ? (foundArray.push(part),
                setFoundCount(foundArray.length),
                (
                  <span
                    key={i}
                    className="highlighted"
                    style={{ backgroundColor: "Highlight" }}
                  >
                    {part}
                  </span>
                ))
              : part,
          setFoundCount(0)
        )}
      </>
    );
  };

  const Preview = ({ text, search }) => {
    return <div>{highlight(text, search)}</div>;
  };
  const [synth, setSynth] = useState(null);

  const [buttonText, setButtonText] = useState("Listen");

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.addEventListener("voiceschanged", () => {
      setSynth(synth);
      //   setVoices(synth.getVoices());
    });
  }, []);

  const speak = () => {
    if (buttonText === "Listen") {
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        setButtonText("Stop");
        utterance.onend = () => setButtonText("Listen");
      }
    } else {
      synth.cancel();
      setButtonText("Listen");
    }
  };

  // const GiveAlert = ()=> {
  //   props.showAlert("Voice typing feature is in development.", "Coming Soon !");
  // }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const [isEncoded, setIsEncoded] = useState(false);

  function handleEncodeClick() {
    if (isEncoded) {
      setText(decode(text));
      setIsEncoded(false);
    } else {
      setText(encode(text));
      setIsEncoded(true);
    }
  }

  function encode(str) {
    return Buffer.from(str).toString("base64");
  }

  function decode(str) {
    return Buffer.from(str, "base64").toString("utf8");
  }

  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <form className="d-flex justify-content-between">
          <h1>{props.heading}</h1>
          <button
            type="button"
            style={{ borderRadius: "50%" }}
            id="mic"
            onClick={handleToggleListen}
            data-bs-toggle="tooltip"
            data-bs-placement="auto"
            title="Voice Typing"
            className={`btn btn-${props.theme} ${
              isListening ? "mic-icon" : ""
            } mx-1 my-auto`}
          >
            {isListening ? (
              <i className="bi bi-mic-fill"></i>
            ) : (
              <i className="bi bi-mic"></i>
            )}
          </button>
        </form>
        <div className="mb-3">
          <textarea
            className={`form-control border-${props.theme}`}
            ref={textRef}
            style={{
              backgroundColor: props.mode === "dark" ? "#202023" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text === text.toUpperCase()}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleUpClick}
        >
          To UpperCase
        </button>
        <button
          disabled={text === text.toLowerCase()}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleLoClick}
        >
          To LowerCase
        </button>
        <button
          disabled={text.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handlePaste}
        >
          Paste
        </button>
        <button
          disabled={text.match(/^.*\s{2,}.*$/) === null}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={undoStack.current.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          disabled={redoStack.current.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleRedo}
        >
          Redo
        </button>
        <button
          type="button"
          disabled={text.length === 0}
          onClick={reset}
          className={`btn btn-${props.theme} mx-1 my-1`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Replace
        </button>
        <button
          type="button"
          disabled={text.length === 0}
          onClick={speak}
          className={`btn btn-${props.theme} mx-1 my-1`}
        >
          {buttonText}
        </button>
        <button
          type="button"
          disabled={text.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleEncodeClick}
        >
          {isEncoded ? "Decode" : "Encode"}
        </button>
        {/* <button type="button" disabled={text.length === 0} onClick={reset2} className={`btn btn-${props.theme} mx-1 my-1`} data-bs-toggle="modal" data-bs-target="#exampleModal2">Find</button> */}
        <button
          type="button"
          disabled={text.length === 0}
          className={`btn btn-${props.theme} mx-1 my-1`}
          onClick={handleDownload}
        >
          Download
        </button>

        {/* --------------------------------------------------------- */}
        <ReplaceX
          theme={props.theme}
          mode={props.mode}
          inputText={inputText}
          setInputText={setInputText}
          inputReplace={inputReplace}
          setInputReplace={setInputReplace}
          handleReplace={handleReplace}
        />
        {/* <Find theme={props.theme} mode={props.mode} /> */}
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <div>
          {<Preview text={text} search={searchText} /> ? (
            <Preview text={text} search={searchText} />
          ) : text ? (
            text
          ) : (
            "Nothing to preview."
          )}
        </div>
      </div>
    </>
  );
}
