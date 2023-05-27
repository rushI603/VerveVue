"use client"

import hygraph from '../../utils/GraphQLConnection' 
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import validate from '../../utils/GetCookieBlog';
import './style.css'
const bcrypt = require('bcryptjs');

const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [prompt, setPrompt]= useState();
  const [message,setMessage] = useState();
  useEffect(()=>{
    if(Cookies.get("blogappsession")?.length){
      location.replace("http://localhost:3000/");
    }
  },[])
  function handleSubmit(e){

    e.preventDefault()
    const data = hygraph.request(`
    query MyQuery {
      authors(where: {email: "${email}"}) {
        password
      }
    }
    `).then((data)=>{
      if(data["authors"].length){
        const hash = data['authors'][0]['password'];
        console.log(hash)
        bcrypt.compare(password, hash,function (err, isMatch){
          if(isMatch){
            Cookies.set('blogappsession',hash,{expires:1})
            console.log(Cookies.get('blogappsession'))
            setMessage("Login Sucessful")
            location.replace("http://localhost:3000/")
          
          }
          else{setPrompt("Password doesn't match")}
        })
      }
      else{
        setPrompt("No such user Exist")
      }
      
    })
  }
  return (
    <div>
      <div class="login-box">
        <h2>Login</h2>
        <h1 className='sucessful'>{message}</h1>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="user-box">
            <input type="text" id="email" name="email" value={email} onChange={(e)=>{setPrompt("");setEmail(e.target.value);}} required/>
            <label>Email</label>
            </div>
            <div className="user-box">
            <input type="password" name="password" id='password' value={password} onChange={(e)=>{setPrompt("");setPassword(e.target.value)}} required/>
            <label>Password</label>
            </div>
            
            <button type='submit'>
              Submit
            </button>
            <p className='login-prompt'>{prompt}</p>
        </form>
        </div>
    </div>
  )
}

export default Login
