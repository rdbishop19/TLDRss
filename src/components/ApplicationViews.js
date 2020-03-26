import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Home from './feed/Home'
import Register from './auth/Register'
import Login from './auth/Login'

export default function ApplicationViews() {
    return (
        <React.Fragment>
            {/* HOME VIEW */}
            <Route exact path="/" render={()=><Redirect to="/feed" />} />
            {/* <Route path="/feed" component={Home} /> */}
            {/* <Route path="/feed/article/:articleId(\d+)" component={Home} /> */}
            <Route path="/coronavirus" component={Home} />
            <Route exact path="/feed" component={Home} />

            {/* FEED ROUTES */}
            <Route path="/feed/source/:feedId(\d+)" component={Home} />
            <Route path="/feed/custom" component={Home} />
            <Route path="/feed/saved" component={Home} />
            <Route path="/feed/favorites" component={Home} />
            <Route path="/feed/mysummaries" component={Home} />

            {/* SUMMARY ROUTES */}
            <Route path="/tldr/favorites" render={props => <p>TLDR FAVORITE LIST</p>} />
            <Route path="/tldr/followed" render={props => <p>TLDR FOLLOWED USERS</p>} />

            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />

        </React.Fragment>
    )
}
