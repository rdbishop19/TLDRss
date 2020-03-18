import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'

export default function Home() {
    const [feed, setFeed] = useState({
        results: []
    })

    const getFeed = () => {
        ApiManager.getAll("article").then(setFeed)
    }

    useEffect(getFeed, [])
    
    return (
        <React.Fragment>
            <div>HOME</div>
            {feed.results.map(entry => <p>thing</p>)}
        </React.Fragment>
    )
}
