import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { logout, isAuthenticated } from '../auth/simpleAuth'
import './Nav.css'
import { withRouter } from 'react-router-dom';
import ApiManager from '../../modules/ApiManager';

function NavBar() {
    
    const history = useHistory()
    const location = useLocation()

    const user = isAuthenticated() ? JSON.parse(sessionStorage.getItem("user")) : null

    const articleId = location.state ? location.state.articleId : null
    
    const [searchText, setSearchText ] = useState('')

    const handleChange = evt => {
        setSearchText(evt.target.value)
    }
    const handleSubmit = evt => {
        evt.preventDefault()
        // console.log('search', searchText)
        history.push({pathname:'/feed', search: `filter=${searchText}`})
    }
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
                    <li className="nav-list-item logo"><span>TL;D<span className="logo-rss">Rss</span></span></li>
                    <li className="nav-list-item"><NavLink activeClassName="active-link" to='/' exact>home</NavLink></li>
                    {isAuthenticated() ?
                        <> 
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/custom'>my feed</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/saved'>saved</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/feed/favorites'>favorites</NavLink></li>
                            <li className="nav-list-item"><NavLink activeClassName="active-link" to='/tldr'>tldr</NavLink></li>
                            <li className="nav-list-item float-right logout"><NavLink to='/login' className="account" onClick={handleLogout}>logout</NavLink></li>
                            <li className="nav-list-item float-right username">{user && user.username}</li>
                        </>
                            :
                        <>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" className="account" to={{pathname:'/register', state: {articleId: articleId}}}>register</NavLink></li>
                            <li className="nav-list-item float-right"><NavLink activeClassName="active-link" className="account" to={{pathname:'/login', state: {articleId: articleId}}}>login</NavLink></li>
                        </>
                    }
                    <li className="nav-list-item special"><NavLink activeClassName="active-special" className="special" to='/coronavirus'>coronavirus</NavLink></li>
                    <li className="nav-list-item">
                        <form onSubmit={handleSubmit}><input onChange={handleChange} className="search" placeholder="search" value={searchText}/></form>
                    </li>
                </ul>
            </div>
       </React.Fragment>
    )
}

export default withRouter(NavBar);