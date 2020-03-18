import React from 'react'
import { Route } from 'react-router-dom'

export default function ApplicationViews() {
    return (
        <React.Fragment>
            <Route exact path="/" render={props => <p>HOME</p>} />

            {/* FEED ROUTES */}
            <Route path="/feed/:feedId(\d+)" render={props => <p>SINGLE FEED</p>} />
            <Route path="/feed/custom" render={props => <p>MY FEED</p>} />
            <Route path="/feed/saved" render={props => <p>SAVED ITEMS</p>} />
            <Route path="/feed/favorites" render={props => <p>FAVORITES</p>} />

            {/* SUMMARY ROUTES */}
            <Route path="/tldr" render={props => <p>USER TLDR SUMMARY LIST</p>} />
            <Route path="/tldr/favorites" render={props => <p>TLDR FAVORITE LIST</p>} />

			{/* <Route path="/login" component={Login} /> */}
            <Route path="/login" render={props => <p>LOGIN</p>} />
            {/* <Route path="/register" component={Register} /> */}
            <Route path='/register' render={props => <p>REGISTER</p>} />
            
        </React.Fragment>
    )
}
