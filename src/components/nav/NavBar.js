import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <React.Fragment>
            <ul>
                <li><NavLink to="/login"> Login </NavLink></li>
                <li><NavLink to="/register"> Register </NavLink></li>
            </ul>
        </React.Fragment>
    )
}
