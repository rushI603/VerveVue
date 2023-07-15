"use client"

import React, {useRef, useState} from 'react'
import Content from './Content'
import ContentEditable from "react-contenteditable"
import hygraph from '@/utils/GraphQLConnection'
import './ViewOne.css'
import './Content.css'


  const Create = () => {
    const [title, setTitle] = useState("")
    const [prompt, setPrompt] = useState("")
    const [image, setImage] = useState()
    const text = useRef(" ")
    const [name, setName] = useState("")
    const [titleCheck, setTitleCheck] = useState(false);
    const [promptCheck, setPromptCheck] = useState(false);
    const [imageCheck, setImageCheck] = useState(false);
    const [contentCheck, setContentCheck] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    
    function handleSubmit(e){
      e.preventDefault();
      setButtonClick(true)

      if(name!=="" && /\S/.test(text.current) && image && prompt!=="" && title!==""){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODc5MzYyODIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsaHU3ZHl3ZjAxcHgwMXVoYXMwaGZqdmUvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY4MWUxYmYyLTljMzEtNDU2YS1hOTAxLTZkNTA3MDk1NzVlYSIsImp0aSI6ImNsamZkb2l1ODAycncwMXVsMzN5MWMybWMifQ.Ujsycl8vobre2UglKQp9NQeh0CK7w1GHXjS--PU015kBiZ3t31IFKH070AnNXfk-ogq8WRrirUPYoAzehkHMZEgByWAba08yc7EtLiRi05my-D4p5Dhx6KNExuNflqKHIA2gstzxBSjJU14C8bz5peFd8X1t4_ksOVRm1ZV-NgCfBeWtS-JcLrq0qy2N9gX2jyMcPiLUqLKTY9e2iOlGIsRzpSR1Jggr0w7P27NwcA8P59q8KJb61lIPZouJxCPaiyGtgd-HYS9RAGArJfNB4BFjipfeiW2JJZ0XlK4dQLE1nLoVIHTI0PRy_Nznxkoq_xvxFKCCVwx0MuWriUNLFm8oCJ__xJlk4TBuWfqE_ojPOwJAHewBAfhEsn76U9F0CixfR4L4-IMCZBcfy6Nj60VAgG9Xpzo7JJZtTacEfCgM1J00GKYVOSF6aHMbuNSIjheCYqD-4XfedhKUnFQOPbjMrdxfLEWORcSRrmnF_0KAHuTF3_F3WbugfBsLM-i5Oy9bFIadZkh6Gt7MxI6VOjHw8T3HH72MWs2XHUbryhXkxLojeswG_U4bpXGMkq4FzIZSDsdNiK2nw0zm16tThAhyXLJSebE_E6qW9TmQVR-ZYCTIF50Oozk-VjP-oMmI5wu8pX5JWVKJ40CSaef-38uEWovQlOZoh8K0sBbMigc");
        const fileInput = document.querySelector('input[type="file"]')
        const formdata = new FormData();
        formdata.append("fileUpload", fileInput.files[0], image);
        console.log(text)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch("https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master/upload", requestOptions)
          .then(response => response.json())
          .then(async (result) => {
            const {id, url} = result;
            console.log(url,id,result)
            var publish = await hygraph.request(`
            mutation MyMutation {
              publishAsset(where: {id: "${id}"},to: PUBLISHED){
                id
              }
            }
            `)
            var {createPost} = await hygraph.request(`
            mutation MyMutation {
              createPost(
                data: {title: "${title}", prompt: "${prompt}", content: {children: [{type: "paragraph", children: [{text: "${text.current}"}]}]}, featuredImage: {connect: {id: "${id}"}}}
              ) {
                id
              }
            }`)
            var publish = await hygraph.request(`
            mutation MyMutation {
              publishPost(where: {id: "${createPost?.id}"}) {
                id
              }
            }`)
            setPrompt('')
            setTitle('')
            setName('Browse...')
            text.current=""
            
            setButtonClick(false)
            console.log(publish)
          })
          .catch(error => {console.log('error', error)
          setButtonClick(false)});

      }
      else{
        
        if (title===""){setTitleCheck(true);console.log("esle")}
        if (prompt===""){setPromptCheck(true);console.log("esle")}
        if (!image) setImageCheck(true);
        if (!/\S/.test(text.current)) setContentCheck(true);
        setButtonClick(false)
      }
      

  }
  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <div className='writable-fields'>
      <div className="fields-wrapper">
        <div className="low-level-wrapper">
          <div className="flex-wrapper">
            <div className='flex-item'>
              <div  className='label-header'>
                <label htmlFor="Title">Title &nbsp; {titleCheck && <div className='text-red'> !Empty</div>}</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div>  
              </div>
              <input type="text" value={title} placeholder='Title' onChange={(e)=>{setTitle(e.target.value);setTitleCheck(false)}}/>
            </div>
            <div className='flex-item'>
              <div  className='label-header'>
                <label htmlFor="Prompt">Prompt  &nbsp; {promptCheck && <div className='text-red'> !Empty</div>}</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div>  
              </div>
              <input type="text" value={prompt} placeholder='Prompt'  onChange={(e)=>{setPrompt(e.target.value);setPromptCheck(false)}}/>
            </div>
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Featured Image">Featured Image &nbsp; {imageCheck && <div className='text-red'> !Empty</div>}</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div> 
              </div>
              <div className='photo-upload'>
                <input type="file" id="selectedFile" value={image}  onChange={(e)=>{setImage(e.target.value);setName(e.target.files[0].name);setImageCheck(false)}}/>
                <input type="button" value={image?name:"Browse..." }/>
              </div>
            </div>            
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Photo">Content &nbsp; {contentCheck && <div className='text-red'>  !Empty</div>}</label>
                <div className="label-left-header">
                  <span><strong>ctrl+B</strong></span>
                  <span><em>ctrl + I</em></span>
                  <span><u>ctrl + U</u></span>
                  <span>Required</span> 
                </div> 
              </div>
              <ContentEditable
                className='rich-text-editable'
                html={text.current}
                onChange={(e)=>{console.log(text.current);text.current=e.target.value;setContentCheck(false)}}
                /><br/>
                <button id='content-submit' type="submit" disabled={buttonClick} style={{background:"#32c48d",padding:"10px",borderRadius:"10px",position:"fixed",bottom:'1rem',right:'1rem'}}>Save & Publish</button>
                </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Create
