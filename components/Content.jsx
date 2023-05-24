"use client"

import React from 'react'
import { useState } from 'react'
const Content = () => {
    const [text, setText] = useState("")
    return (
        <div>
            <div className="content-toolbar">
                <div className="content-toolbar-level-2">
                    <div className="content-flex-wrapper">
                        
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div data-gramm="false" role="textbox" name="content" class="rich-text-editable" spellcheck="true" autocorrect="false" autocapitalize="false" data-slate-editor="true" data-slate-node="value" contenteditable="true" style={{position: "relative", outline: "none", "white-space": "pre-wrap", "overflow-wrap": "break-word",}}>
                    <p data-slate-node="element" class="content-para">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Content
