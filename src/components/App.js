import React from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './nav/NavBar'
import './App.css'

export default function App() {
    return (
        <React.Fragment>
            <NavBar />
            <ApplicationViews />
        </React.Fragment>
    )
}
