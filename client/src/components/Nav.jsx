import React from 'react'
import { Link } from "react-router-dom"
import Menu from 'react-burger-menu/lib/menus/slide'

const Nav = () => {

    return (
        <nav className="siteNav">
            <Link to="/">
                <img src="/images/rpdr_bracket_logo.png" className="logo" alt="Drag Draft Logo"/>
            </Link>
            <Menu right >
                <Link to='/'>Home</Link>
                <Link to='/queens'>Queens</Link>
                <Link to='/players'>Players</Link>
                <Link to='/weeks'>Weeks</Link>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/rules'>Rules</Link>
            </Menu>      
        </nav>
    )
}

export default Nav
