"use client"

import React from 'react'
import {GraphQLClient} from 'graphql-request'
import './style.css'
import { useState } from 'react'

const handleSubmit = async (e)=>{
  e.preventDefault();
  const email = e.target.email.value


  const hygraph = new GraphQLClient(
    'https://api-ap-south-1.hygraph.com/v2/clhu7dywf01px01uhas0hfjve/master');
  const data = hygraph.request(`
  query MyQuery {
    authors(where: {email: "${email}"}) {
      password
    }
  }
  `)
  console.log(data)
  //if(author["password"])console.log(author["password"])
}
const Login = () => {
  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form action='localhost:3000/api/signin'>
            <div className="user-box">
            <input type="text" name="email" id='email' required/>
            <label>Email</label>
            </div>
            <div className="user-box">
            <input type="password" name="password" id='password' required/>
            <label>Password</label>
            </div>
            <button type='submit'>
              Submit
            </button>
        </form>
        </div>
    </div>
  )
}

export default Login
