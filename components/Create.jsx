"use client"

import React, {useState} from 'react'
import Content from './Content'
import ContentEditable from "react-contenteditable"
import {GraphQLClient} from 'graphql-request'
import './ViewOne.css'
import './Content.css'
const hygraph = new GraphQLClient(
  'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload');

const Create = () => {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState()
  const [text, setText] = useState("hello")
  const [name, setName] = useState("")
  
  function handleSubmit(e){
    e.preventDefault();
    const input = document.querySelector('input[type="file"]')
    const form = new FormData()
    console.log(input)
    form.append('file',input)
    fetch(`https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload`,{
      method:'POST',
      mode:"no-cors",
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODc5MzYyODIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsaHU3ZHl3ZjAxcHgwMXVoYXMwaGZqdmUvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY4MWUxYmYyLTljMzEtNDU2YS1hOTAxLTZkNTA3MDk1NzVlYSIsImp0aSI6ImNsamZkb2l1ODAycncwMXVsMzN5MWMybWMifQ.Ujsycl8vobre2UglKQp9NQeh0CK7w1GHXjS--PU015kBiZ3t31IFKH070AnNXfk-ogq8WRrirUPYoAzehkHMZEgByWAba08yc7EtLiRi05my-D4p5Dhx6KNExuNflqKHIA2gstzxBSjJU14C8bz5peFd8X1t4_ksOVRm1ZV-NgCfBeWtS-JcLrq0qy2N9gX2jyMcPiLUqLKTY9e2iOlGIsRzpSR1Jggr0w7P27NwcA8P59q8KJb61lIPZouJxCPaiyGtgd-HYS9RAGArJfNB4BFjipfeiW2JJZ0XlK4dQLE1nLoVIHTI0PRy_Nznxkoq_xvxFKCCVwx0MuWriUNLFm8oCJ__xJlk4TBuWfqE_ojPOwJAHewBAfhEsn76U9F0CixfR4L4-IMCZBcfy6Nj60VAgG9Xpzo7JJZtTacEfCgM1J00GKYVOSF6aHMbuNSIjheCYqD-4XfedhKUnFQOPbjMrdxfLEWORcSRrmnF_0KAHuTF3_F3WbugfBsLM-i5Oy9bFIadZkh6Gt7MxI6VOjHw8T3HH72MWs2XHUbryhXkxLojeswG_U4bpXGMkq4FzIZSDsdNiK2nw0zm16tThAhyXLJSebE_E6qW9TmQVR-ZYCTIF50Oozk-VjP-oMmI5wu8pX5JWVKJ40CSaef-38uEWovQlOZoh8K0sBbMigc`,
      },
      body: form,
    }).
    then((data)=>{
      console.log(data)
    })
    .catch((e)=>console.log(e,"error"))

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
                <input type="file" id="selectedFile" value={image}  onChange={(e)=>{setImage(e.target.value);setName(e.target.files[0].name)}}/>
                <input type="button" value={image?name:"Browse..." }/>
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
