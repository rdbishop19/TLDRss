import React, { useState, useRef, createRef } from 'react'
import { parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import './Search.css';

export default function Search() {

    const history = useHistory()
    const location = useLocation()
    const { pathname } = location
    const parsed = parse(location.search);
    const inputRef = createRef()
    const clearRef = createRef()
    
    const [searchText, setSearchText ] = useState(parsed?.filter || '')

    const handleChange = evt => {
        setSearchText(evt.target.value)
    }
    const handleSubmit = evt => {
        evt.preventDefault()
        clearRef.current.focus()
        const newPath = 
            pathname === "/login" || pathname === "/register" ? '/feed' : pathname
        const searchFilter = searchText ? `filter=${encodeURIComponent(searchText)}` : ""
        // used when user enters search item from login or register views
        history.push({
            pathname: newPath, 
            search: searchFilter
        })
    }

    const clearSearch = () => {
        setSearchText('')
        if (parsed.filter){
            history.push(pathname)
        }
        // inputRef.current.focus()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="search">
                <img 
                    className="search-icon" 
                    src="https://img.icons8.com/material-outlined/16/000000/search.png" 
                    alt="search"
                />
                <input 
                    type="text"
                    ref={inputRef} 
                    tabIndex="8" 
                    className="search-input" 
                    onChange={handleChange} 
                    placeholder="search" 
                    value={searchText}/>
                <input 
                    type="button" 
                    ref={clearRef}
                    className="clear-button" 
                    tabIndex="9"
                    title="clear search"
                    onClick={clearSearch} 
                />
            </div>
        </form>
    )
}
