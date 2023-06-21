"use client"

import React, { useEffect, useState } from 'react'
import validate from '../utils/GetCookieBlog'
import Cookies from 'js-cookie';
const Nav = () => {
  const [session, setSession] = useState(false);
  const [username,setUsername] = useState("");
  useEffect(()=>{
    setSession(validate())
  },[])
  return (
    <nav className="main-nav">
        <h1 className='logo'>VerveVue</h1>
        <div id='message-prompt'></div>
        <ul className="right-menu">
            <li>
              {!session &&<a href="/signin">
                Login
            </a>}
            
            </li>
            <li>
            {!session &&<a href="/signup">
                Signup
            </a>}
            </li>
            <li>
              <a href='/create'>
                Create &nbsp;
                <svg
                  style={{display:"inline",marginBottom:"2px"}}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M9 10V8h2v2h2v2h-2v2H9v-2H7v-2h2zm-5 8h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="/viewblog">ViewBlog</a>
            </li>
            <li>
              {session && 
              <>
                <a onClick={()=>{Cookies.set("blogappsession","",{expires:1});setSession(false)}}>
                  Logout
                </a>
              </>
              }
            </li>
            
            
        </ul>
    </nav>
  )
}

export default Nav
