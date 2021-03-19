import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginUI from './pages/LoginUI/loginUI';
import usersUI from './pages/UsersUI/usersUI';
import StoreProvider from './storage/Provider'
import RoutesPrivate from './utils/Private'

function Routes(){
    return(
    <BrowserRouter>
    <StoreProvider>
    <Switch>
        <RoutesPrivate exact path="/home/" component={usersUI}/>
        <Route exact path="/" component={LoginUI}/>
    </Switch>
    </StoreProvider>
    </BrowserRouter>
    )
}

export default Routes;
