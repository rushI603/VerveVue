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
  const [image, setImage] = useState()
  const [text, setText] = useState("hello")
  
  function handleSubmit(e){
    e.preventDefault();
    console.log({title,prompt,image,text})
    fetch(`https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload`,{
      method:'POST',
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODQ4MjMyNjcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsaHU3ZHl3ZjAxcHgwMXVoYXMwaGZqdmUvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjIyY2MwMWIyLTA0ZTYtNGYzMy1iOWZiLWUwZWE3Njg2OTExOSIsImp0aSI6ImNsaHp3OXQyeTJ4cm0wMXVoN3Y3ZGJpaGEifQ.2u5uO4unDSbElb_5plnJ4P8f0-iQAG8M3FR6dFvMXtiZMh1ce99j7Qa-ff-q-T6xixHKYL_E6ge6WOza0MDTepfKh3BHCxbGAvXc1uKHC1xAt7ZoeE0QnuQ3Cr_3UM9s-0wrWpOhcsUIR5H-d5MsjcmGxSFGmRK6g5mvNnEKefkQdiwNbZ7Vg2kixWiyc4Gbx5zb55FhEB2EZgkE3ytmmZYF4FOFfH1eJq-Ywe7lxaUZdGNFNJor4rBpmWheLYL7XdFrPPtO7x1SMGEtgJxt6rUclHIzyh1aQrYpggSiO7-VvOGHKD_HwH9scLJfZAryy8E6Gt8ae-hlD7yNbTcQr7SyXX5mqRsEvBed3TUhysC90SFmtbJtqjDff9MEso-BOsf17vN0nRIdnYlQo9maJqXLNd9wpZVU1iSolekM5wgasx51WcrbvHQuZjpAHVtSYZ7OsbrlhKFAmHuA16wcLry6QBOnw-H9XEw8lmjglwwIqF4l5wwY6gbRB5anHkUnH7wbSb8216P2iGPe24xedRpH1YTrXtZ3ecxUAGRWNu6h_Tp8XB2CbdR-6ZC_KV2brasIjGdr1nABKTZuKbWYwcdmDCILftdr_Pmd-llh1KfBYxrclnsA75imW96PqwQeWCGTX0z8Jwr8j9OJ00iRftWFPAE82YTttpMas8o8aao"}`,
      },
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
