import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux' 
import promise from 'redux-promise'

import Navbar from './container/Navbar'
import reducers from './reducers'
import config from '../config'
import { Home, Compose, Login, View } from './container'

import './main.scss'

const createStoreWithMiddleware = applyMiddleware( promise )( createStore )

function App( ) {
  return (
    <Provider store={createStoreWithMiddleware( reducers )}>
      <BrowserRouter>
        <div id='app'>
          <Switch>
            <Route path='/post/:post' component={View} />           
            <Route path='/compose' component={Compose} />     
            <Route path='/login' render={() => <Login />} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

gapi.load( 'auth2', () => {
  gapi.auth2.init( { client_id : config.GOOGLE_CLIENT_ID } )
      .then( () => ReactDOM.render( <App />, document.querySelector( '.container' ) ) )
} )
