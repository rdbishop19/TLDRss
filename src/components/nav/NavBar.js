import React, { useEffect } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { logout, isAuthenticated } from '../auth/simpleAuth'
import './Nav.css'
import { withRouter } from 'react-router-dom';

function NavBar() {

    const history = useHistory()
    const location = useLocation()
    const articleId = location.state ? location.state.articleId : null
    
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")){
                logout()
            }
        // history.push('/login')
    }

    return (
       <React.Fragment>
            <div className="nav-container">
                <ul className="nav-list">
                    <li className="nav-list-item logo"><span>tl;d<span className="logo-rss">rss</span></span></li>
                    <li className="nav-list-item"><NavLink activeClassName="active-link" to='/' exact>home</NavLink></li>
                    {isAuthenticated() ?
                        <> 
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/custom'>my feed</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/saved'>saved</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/favorites'>favorites</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/tldr'>tldr</NavLink></li>
                            <li className="nav-list-item special"><NavLink activeClassName="active-special" className="special" to='/coronavirus'>coronavirus</NavLink></li>
                            <li className="nav-list-item float-right"><NavLink to='/login' onClick={handleLogout}>logout</NavLink></li>
                        </>
                            :
                        <>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" to={{pathname:'/register', state: {articleId: articleId}}}>register</NavLink></li>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" to={{pathname:'/login', state: {articleId: articleId}}}>login</NavLink></li>
                        </>
                    }
                </ul>
            </div>
       </React.Fragment>
    )
}

export default withRouter(NavBar);