"use client"

import React,{ useState } from 'react'
import './Content.css'
const Content = () => {
    const [text, setText] = useState(``)
    return (
        <div>
            <div className='content-wrapper'>
                <div data-gramm="false" role="textbox" name="content" innerHTML={text} onChange={(e)=>{console.log(e.target.value)}} className="rich-text-editable" spellcheck="true" autocorrect="false" autocapitalize="false" data-slate-editor="true" data-slate-node="value"  contentEditable="true" style={{position: "relative", outline: "none", "white-space": "pre-wrap", "overflow-wrap": "break-word",}}>
                    
                </div>
            </div><br/>
            <button style={{background:"#32c48d",padding:"10px",borderRadius:"10px",position:"fixed",bottom:'1rem',right:'1rem'}}>Save & Publish</button>
        </div>
    )
}

export default Content
