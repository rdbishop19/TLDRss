import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import Home from './feed/Home'
import Register from './auth/Register'
import Login from './auth/Login'
import { isAuthenticated } from './auth/simpleAuth'
import { SummaryContainer } from './feed/SummaryContainer'

export default function ApplicationViews() {
    
    const history = useHistory()

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
            <Route path="/feed/articles/:articleId(\d+)" component={SummaryContainer} />

            {/* SUMMARY ROUTES */}
            <Route path="/tldr/favorites" render={props => <p>TLDR FAVORITE LIST</p>} />
            <Route path="/tldr/followed" render={props => <p>TLDR FOLLOWED USERS</p>} />

            <Route path="/login" render={()=> isAuthenticated() ? history.goBack() : <Login />} />
            <Route path='/register' render={()=> isAuthenticated() ? history.goBack() : <Register />} />

        </React.Fragment>
    )
}
