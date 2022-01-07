import React from 'react'
import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <div>
            <h1>Drag Draft Season 14</h1>
            <Link to='/'>Home</Link>
            <Link to='/queens'>Queens</Link>
            <Link to='/players'>Players</Link>
            <Link to='/weeks'>Weeks</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/rules'>Rules</Link>
        </div>
    )
}

export default Nav
