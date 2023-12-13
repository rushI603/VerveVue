"use client"

import hygraph from '../../utils/GraphQLConnection' 
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';
import validate from '../../utils/GetCookieBlog';
import './style.css'
import Loading from '@/components/Loading';
const bcrypt = require('bcryptjs');

const Login = () => {
  const messagePrompt = useRef();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [prompt, setPrompt]= useState();
  const [message,setMessage] = useState();
  const [submitDisable, setSubmitDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    if(Cookies.get("blogappsession")?.length){
      location.replace("http://localhost:3000/");
    }
  },[])
  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    setSubmitDisable(true)
    const data = await hygraph.request(`
    query MyQuery {
      authors(where: {email: "${email}"}) {
        id
        password
      }
    }
    `)

      if(data["authors"].length){
        const hash = data['authors'][0]['password'];
        bcrypt.compare(password, hash,function (err, isMatch){
          if(isMatch){
            Cookies.set('blogappsession',data['authors'][0]['id'],{expires:1})
            messagePrompt.innerText="Login successful";
            location.replace("http://localhost:3000/")
          
          }
          else{setPrompt("Password doesn't match")}
        })

      }
      else{
        setPrompt("Please signup you don't have an account")
      }
      setSubmitDisable(false);
      
    
  }
  return (
    <div>
      {
        !loading?
      <div class="login-box">
        <h2 style={{color:"black"}}>Login</h2>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="user-box">
              <input style={{borderColor:"black"}} type="email" id="email" name="email" value={email} onChange={(e)=>{setPrompt("");setEmail(e.target.value);}} required/>
              <label >Email</label>
            </div>
            <div className="user-box">
              <input style={{borderColor:"black"}} type="password" name="password" id='password' value={password} onChange={(e)=>{setPrompt("");setPassword(e.target.value)}} required/>
              <label >Password</label>
            </div>
            <button type='submit' disabled={submitDisable} id='in-submit' >
              Submit
            </button>
            <p className='login-prompt'>{prompt}</p>
        </form>
        </div>
        :
        <Loading/>
        }
    </div>
  )
}

export default Login
