import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import { API_SERVER } from '../../config'
import Google from '../utils/Google'
import { setAuth } from '../actions'
import config from '../../config'
import './Login.scss'
import GoogleButton from './GoogleButton'



class Login extends Component {

	constructor( props ) {
		super( props )
    this.state = { 
      isSignedIn : Google.isSignedIn()
    }
	}

  render() {

    if ( this.state.isSignedIn ) {
      const id_token = Google.getUserIdToken()
      axios.post( API_SERVER + '/setup', { token : id_token } )
           .catch( console.error )
      return <Redirect to='/' />
    }

    return (
      <div id='login'>
        <h1>Simple Journal.</h1>
        <p>Write words. Keep them private.</p>
        <GoogleButton onSuccess={() => this.setState({ isSignedIn : true })} />
      </div>
    )
    
  }

}

export default Login
