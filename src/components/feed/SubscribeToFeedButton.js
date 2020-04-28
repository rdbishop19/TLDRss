import React from 'react'
import { isAuthenticated } from '../auth/simpleAuth'
import { Link } from 'react-router-dom'

export default function SubscribeToFeedButton({ params, source, updateFeedSubscription }) {
    return (
        <span className="button-container subscribe">
            {
                isAuthenticated() 
                ? 
                <button onClick={()=>updateFeedSubscription(params.feedId)}>
                    Add {source.name} to my feed
                </button> 
                : 
                <Link 
                    style={{color:"orange"}} 
                    to={{
                        pathname:"/login", 
                        state: { feedId: source.id }
                    }}
                >
                    Login to subscribe to feed sources
                </Link>
            }
        </span>
    )
}
