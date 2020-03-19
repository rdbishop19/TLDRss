import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { logout, isAuthenticated } from '../auth/simpleAuth'
import './Nav.css'

export default function NavBar() {

    const history = useHistory()
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")){
            logout()
            history.push('/')
        }
    }

    return (
       <React.Fragment>
            <div className="nav-container">
                <ul className="nav-list">
                    <li className="nav-list-item"><NavLink activeClassName="active-link" to='/'>Home</NavLink></li>
                    {isAuthenticated() ? <li className="nav-list-item float-right"><NavLink to='' onClick={handleLogout}>Logout</NavLink></li> :
                        <>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" to='/register'>Register</NavLink></li>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" to='/login'>Login</NavLink></li>
                        </>
                    }
                </ul>
            </div>
       </React.Fragment>
    )
}
