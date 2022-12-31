import React from 'react'

export default function FAQ(props) {
  return (
    <div className='container'>
        <h2 className={`text-${props.mode === 'dark'?'light':'dark'}`}>FAQ</h2>
        <div className="accordion" id="accordionExample">
            <div className={`accordion-item bg-${props.mode} border-${props.theme} text-${props.mode === 'dark'?'light':'dark'}`}>
                <h2 className="accordion-header" id="headingOne">
                <button className={`accordion-button bg-${props.mode} text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <strong>What is TextUtils?</strong>
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className={`accordion-body bg-${props.mode === 'dark'?'black':'white'}`}>
                TextUtils is a feature-rich and customizable text editor that allows users to input, edit, and manipulate text.
                </div>
                </div>
            </div>
            <div className={`accordion-item bg-${props.mode} border-${props.theme} text-${props.mode === 'dark'?'light':'dark'}`}>
                <h2 className="accordion-header" id="headingTwo">
                <button className={`accordion-button bg-${props.mode} text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <strong>What are some features of TextUtils?</strong>
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className={`accordion-body bg-${props.mode === 'dark'?'black':'white'}`}>
                TextUtils includes features such as the ability to convert text to uppercase or lowercase letters, copy and paste text, remove spaces, search and replace text, and use advanced features such as spell check and auto-complete.
                </div>
                </div>
            </div>
            <div className={`accordion-item bg-${props.mode} border-${props.theme} text-${props.mode === 'dark'?'light':'dark'}`}>
                <h2 className="accordion-header" id="headingThree">
                <button className={`accordion-button bg-${props.mode} text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <strong>Is TextUtils customizable?</strong>
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className={`accordion-body bg-${props.mode === 'dark'?'black':'white'}`}>
                Yes, TextUtils offers custom theme options so users can tailor the look and feel of the text editor to their liking. Users can choose from a variety of color schemes and font options, and can also enable the dark mode feature for a more comfortable editing experience.
                </div>
                </div>
            </div>
            <div className={`accordion-item bg-${props.mode} border-${props.theme} text-${props.mode === 'dark'?'light':'dark'}`}>
                <h2 className="accordion-header" id="headingFour">
                <button className={`accordion-button bg-${props.mode} text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <strong>Is TextUtils suitable for coding?</strong>
                </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div className={`accordion-body bg-${props.mode === 'dark'?'black':'white'}`}>
                Yes, TextUtils includes advanced features such as syntax highlighting and auto-complete that make it suitable for coding.
                </div>
                </div>
            </div>
            <div className={`accordion-item bg-${props.mode} border-${props.theme} text-${props.mode === 'dark'?'light':'dark'}`}>
                <h2 className="accordion-header" id="headingFive">
                <button className={`accordion-button bg-${props.mode} text-${props.mode === 'dark'?'light':'dark'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    <strong>How do I get started with TextUtils?</strong>
                </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                <div className={`accordion-body bg-${props.mode === 'dark'?'black':'white'}`}>
                To get started with TextUtils, simply download the software and install it on your computer. Then, open TextUtils and start inputting, editing, and manipulating text to your heart's content. If you need help, the TextUtils user manual and online support resources are available to guide you.
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
