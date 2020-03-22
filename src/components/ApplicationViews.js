import React from 'react'
import { Route } from 'react-router-dom'
import Home from './feed/Home'
import Register from './auth/Register'
import Login from './auth/Login'

export default function ApplicationViews() {
    return (
        <React.Fragment>
            {/* HOME VIEW */}
            <Route exact path="/" component={Home} />
            {/* <Route path="/feed" component={Home} /> */}
            {/* <Route path="/feed/article/:articleId(\d+)" component={Home} /> */}
            <Route path="/coronavirus" component={Home} />
            <Route exact path="/feed" component={Home} />

            {/* FEED ROUTES */}
            <Route path="/feed/source/:feedId(\d+)" component={Home} />
            <Route path="/feed/custom" render={props => <p>MY FEED</p>} />
            <Route path="/feed/saved" render={props => <p>SAVED ITEMS</p>} />
            <Route path="/feed/favorites" render={props => <p>FAVORITES</p>} />

            {/* SUMMARY ROUTES */}
            <Route exact path="/tldr" render={props => <p>USER TLDR SUMMARY LIST</p>} />
            <Route path="/tldr/favorites" render={props => <p>TLDR FAVORITE LIST</p>} />
            <Route path="/tldr/followed" render={props => <p>TLDR FOLLOWED USERS</p>} />

            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />

        </React.Fragment>
    )
}
