import React from "react"
import { Route, Redirect } from "react-router-dom"
import universal from 'react-universal-component'
const UniversalComponent = universal(props => import(`../components/${props.page}`), {ignoreBabelRename : true})

export const StaticRoutes = () => {
    return (
        <React.Fragment>
            <Route path = '/ssr/home'>
                <UniversalComponent page='Home' />
            </Route> 
            <Route path = '/ssr/item'>
                <UniversalComponent page='Item' />
            </Route>
            <Route path='/ssr/auth'>
                <UniversalComponent page='AuthForm' />
            </Route>
            <Route exact path="/">
                <Redirect to="/ssr/home" />
            </Route>
        </React.Fragment>      
    )
}