import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <React.Fragment>
            <NavLink to="/register" >Register</NavLink>
        </React.Fragment>
    )
}
