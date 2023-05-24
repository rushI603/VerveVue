"use client"

import {GraphQLClient} from 'graphql-request'
import './style.css'


const Login = async () => {
  
  
  console.log(posts)
  return (
    <div>
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={submit}>
            <div class="user-box">
            <input type="text" id="email" name="email" required/>
            <label>Username</label>
            </div>
            <div class="user-box">
            <input type="password" name="password" id='password' required/>
            <label>Password</label>
            </div>
            <a href="">
              Submit
            </a>
        </form>
        </div>
    </div>
  )
}

export default Login
