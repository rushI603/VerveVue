"use client"

import React,{ useState } from 'react'
import hygraph from '../../utils/GraphQLConnection'
import './style.css'
const bcrypt = require('bcryptjs')

const Login = () => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [prompt, setPrompt] = useState("");
  const [userName, setUserName] = useState("");

  function handleSubmit(e){
    e.preventDefault()
  
    const data = hygraph.request(`
    query MyQuery {
      authors(where: {email: "${email}"}) {
        password
      }
    }
    `).
    then((data)=>{
      if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))setPrompt("Invalid Email Id");
       else if(data["authors"].length) setPrompt("User already exist");
      else{
        if(password.length<8) setPrompt("Password should atleast be of length 8");
        else{
          const hashedPassword = bcrypt.hashSync(password,10);
          hygraph.request(`
          mutation MyMutation {
              createAuthor(data: {name: "${name}", password: "${password}", email: "${email}"}) {
                id
              }
            }
          `).then(
        (data)=>{
            console.log(data["createAuthor"]?.id!="")
            if(data["createAuthor"]?.id!=""){
              setPrompt("Account created successfully");
              location.replace("http://localhost:3000/signin")
            }
        }
    )
            
        
        
        }
      }
        
    })
    }


  return (
    <div>
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="user-box">
              <input type="text" id="email" name="email" value={email} onChange={(e)=>{setPrompt("");setEmail(e.target.value);}} required/>
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="text" id="username" name="username" value={userName} onChange={(e)=>{setPrompt("");setUserName(e.target.value);}} required/>
              <label>UserName</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" id='password' value={password} onChange={(e)=>{setPrompt("");setPassword(e.target.value)}} required/>
              <label>Password</label>
            </div>
            
            <button type='submit'>
              Submit
            </button><br/>
            <p className='login-prompt'>{prompt}</p>
        </form>
        </div>
    </div>
  )
}

export default Login
