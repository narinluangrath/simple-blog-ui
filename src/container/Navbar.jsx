import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Navbar.scss'

import Google from '../utils/Google'

class Navbar extends PureComponent {

  constructor( props ) {
    super( props )
    this.state = { 
      isSignedIn : Google.isSignedIn()
    }
    this.logout = this.logout.bind( this )
  }

  logout() {
    Google.disconnect().then( () => this.setState({ isSignedIn : false }) )
  }

  render() {
    const { isSignedIn } = this.state
    const name = Google.getUserName()
    if ( isSignedIn ) {
      return (
        <div id='navbar'>
          <Link to='/'>
            <h4>Simple Journal.</h4>
          </Link>
          <div id='logoutText' onClick={this.logout}>
            {`Logout (${name})`}
          </div>
        </div>
      )
    }
    return <Redirect to='/login' />
  }  

}


export default Navbar
