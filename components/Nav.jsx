"use client"

import React, { useEffect, useState } from 'react'
import validate from '../utils/GetCookieBlog'
import Cookies from 'js-cookie';
const Nav = () => {
  const [session, setSession] = useState(false);
  useEffect(()=>{
    setSession(validate())
  },[])
  return (
    <nav className="main-nav">
        <h1 className='logo'>Blog App</h1>
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
              {session && 
              <a onClick={()=>{Cookies.set("blogappsession","",{expires:1});setSession(false)}}>
                Logout
              </a>
              }
            </li>
        </ul>
    </nav>
  )
}

export default Nav
