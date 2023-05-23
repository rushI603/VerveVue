import React from 'react'

const Nav = () => {
  return (
    <nav class="main-nav">
        <h1 className='logo'>Blog App</h1>
        <ul class="right-menu">
            <li>
            <a href="/signin">
                Login
            </a>
            </li>
            <li>
            <a href="/signup">
                Signup
            </a>
            </li>
        </ul>
    </nav>
  )
}

export default Nav
