import React from 'react'
import { isAuthenticated } from '../auth/simpleAuth'
import { Link } from 'react-router-dom'

export default function SubscribeToFeedButton({ params, source, updateFeedSubscription }) {
    return (
        <div className="button-container subscribe">
            {
                isAuthenticated() 
                ? 
                <button onClick={()=>updateFeedSubscription(params.feedId)}>
                    Subscribe to {source.name}
                </button> 
                : 
                <Link 
                    // className="subscribe"
                    style={{color:"orange"}} 
                    to={{
                        pathname:"/login", 
                        state: { feedId: source.id }
                    }}
                >
                    Login to subscribe to feed sources
                </Link>
            }
        </div>
    )
}
