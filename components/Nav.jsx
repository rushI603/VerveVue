import React from 'react'
import '../app/globals.css'
const Nav = () => {
    return (
        <div>
            <header class="header" id="header">

            <nav class="navbar container">
                <a href="/">
                    <h2 class="logo">Triluxo</h2>
                </a>

                <div class="list list-right">
                    <a href="/signin" class="list-link ">Sign in</a>
                    <a href="/signup" class="btn sign-up-btn fancy-border ">
                        <span>Sign up</span>
                    </a>
                </div>

            </nav>

            </header>
            <div class="search-form-container container" id="search-form-container">

                <div class="form-container-inner">

                    <form action="" class="form">
                        <input class="form-input" type="text" placeholder="What are you looking for?"/>
                        <button class="btn form-btn" type="submit">
                            <i class="ri-search-line"></i>
                        </button>
                    </form>
                    <span class="form-note">Or press ESC to close.</span>

                </div>

            <button class="btn form-close-btn place-items-center" id="form-close-btn">
                <i class="ri-close-line"></i>
            </button>
            </div>
        </div>
    )
    }

    export default Nav
