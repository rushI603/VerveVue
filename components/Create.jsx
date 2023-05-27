"use client"

import React, {useState} from 'react'
import Content from './Content'
import ContentEditable from "react-contenteditable"
import {GraphQLClient} from 'graphql-request'
import './ViewOne.css'
const hygraph = new GraphQLClient(
  'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload');

const Create = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState("")
  const [text, setText] = useState("hello")
  
  function handleSubmit(e){
    e.preventDefault();
    console.log({title,prompt,image,text})
    fetch(`https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload`,{
      method:'POST',
      body: image,
    }).
    then((data)=>{
      console.log(data)
    })

  }
  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <div className='writable-fields'>
      <div className="fields-wrapper">
        <div className="low-level-wrapper">
          <div className="flex-wrapper">
            <div className='flex-item'>
              <div  className='label-header'>
                <label htmlFor="Title">Title</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div>  
              </div>
              <input type="text" value={title} placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div className='flex-item'>
              <div  className='label-header'>
                <label htmlFor="Prompt">Prompt</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div>  
              </div>
              <input type="text" value={prompt} placeholder='Prompt'  onChange={(e)=>{setPrompt(e.target.value)}}/>
            </div>
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Featured Image">Featured Image</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div> 
              </div>
              <div className='photo-upload'>
                <input type="file" id="selectedFile" value={image}  onChange={(e)=>{setImage(e.target.value)}}/>
                <input type="button" value="Browse..." />
              </div>
            </div>            
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Photo">Content</label>
                <div className="label-left-header">
                  <span><strong>ctrl+B</strong></span>
                  <span><em>ctrl + I</em></span>
                  <span><u>ctrl + U</u></span>
                  <span>Required</span> 
                </div> 
              </div>
              <ContentEditable
                className='rich-text-editable'
                innerRef={text}
                onChange={(e)=>{setText(e.target.value)}}
                /><br/>
                <button type="submit" style={{background:"#32c48d",padding:"10px",borderRadius:"10px",position:"fixed",bottom:'1rem',right:'1rem'}}>Save & Publish</button>
                </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Create
