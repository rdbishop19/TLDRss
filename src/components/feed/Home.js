import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'

export default function Home() {
    const [feed, setFeed] = useState({
        results: []
    })

    const getFeed = () => {
        ApiManager.getAll("articles").then(setFeed)
    }

    useEffect(getFeed, [])
    
    return (
        <React.Fragment>
            <h2>feed</h2>
            {feed.results.map((entry, index) => {
                return <div key={index}>{entry.title}</div>
            })}
        </React.Fragment>
    )
}
