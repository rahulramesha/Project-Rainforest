import React from 'react'
import { Switch } from "react-router"
import { BrowserRouter as Router } from 'react-router-dom'

import { StaticRoutes } from '../Routes'
import { AppBar } from '../components/common/AppBar'

export default () => {
    return (
        <Router>
            <AppBar />
            <Switch>
                <StaticRoutes />
            </Switch>
        </Router>  
    )
}