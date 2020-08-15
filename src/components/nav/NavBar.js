import React, { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { logout, isAuthenticated } from '../auth/simpleAuth'
import './Nav.css'
import { withRouter } from 'react-router-dom';
// import { parse } from 'query-string';
import Search from './Search';

function NavBar() {
    
    const history = useHistory()
    const location = useLocation()
    const { 
        // pathname, 
        state: routerState 
    } = location
    // const parsed = parse(location.search);

    const user = isAuthenticated() ? JSON.parse(sessionStorage.getItem("user")) : null

    const articleId = routerState ? routerState.articleId : null
    
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")){
            logout()
            history.push('/')
        }
    }

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMobileDrawer = () => {
        setMenuOpen(prevState => !prevState)
    }

    const handleClick = () => {
        setMenuOpen(false)
    }

    const handleHomeClick = () => {
        setMenuOpen(false)
        history.push('/feed')
    }

    const menuStyle = {
        float: "none",
        display: "block",
        textAlign: "left"
      }

    return (
       <React.Fragment>
            <div className="nav-container">
                <ul className="nav-list">
                    <li onClick={handleHomeClick} className="nav-list-item logo"><span>TL;D<span className="logo-rss">Rss</span></span></li>
                    <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item"><NavLink activeClassName="active-link" to='/feed' exact>home</NavLink></li>
                    {isAuthenticated() && 
                        <> 
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/custom'>my feed</NavLink></li>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/saved'>saved</NavLink></li>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/favorites'>favorites</NavLink></li>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/mysummaries'>posts</NavLink></li>
                        </>
                    }
                    <li onClick={handleClick}  style={ menuOpen ? menuStyle : undefined } className="nav-list-item special">
                        <NavLink activeClassName="active-link active-special" className="special" to='/coronavirus'>
                            coronavirus
                        </NavLink>
                    </li>
                    <li id="search" style={ menuOpen ? { display: 'none' } : undefined } className="nav-list-item">
                        <Search methods={{setMenuOpen}}/>
                    </li>
                    <li id="hamburger" style={ menuOpen ? { display: 'none' } : undefined } className="nav-list-item icon" onClick={toggleMobileDrawer}>
                        <i className="fa fa-lg fa-bars"></i>
                    </li>
                    {!isAuthenticated() ?
                        <>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item float-right"><NavLink activeClassName="active-link" className="account" to={{pathname:'/register', state: {articleId: articleId}}}>register</NavLink></li>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item float-right"><NavLink activeClassName="active-link" className="account" to={{pathname:'/login', state: {articleId: articleId}}}>login</NavLink></li>
                        </>
                        :
                        <>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item float-right logout"><button className="account" onClick={handleLogout}>logout</button></li>
                            <li onClick={handleClick} style={ menuOpen ? menuStyle : undefined } className="nav-list-item float-right username">{user && user.username}</li>
                        </>
                    }
                </ul>
            </div>
       </React.Fragment>
    )
}

export default withRouter(NavBar);