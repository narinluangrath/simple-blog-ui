import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Navbar from './Navbar'
import { API_SERVER } from '../../config'
import Google from '../utils/Google'
import { getPosts } from '../actions'
import './View.scss'

class View extends PureComponent {

	constructor( props ) {
		super( props )
    this.state = {
    }
	}

  componentDidMount() {
    const token = Google.getUserIdToken()
    if ( token ) {
      this.props.getPosts( token )
    }
  }

	render() {
    if ( !this.props.post ) {
      return null
    }

    const { title, body, image } = this.props.post

		return (
      <div id='view'>
        <Navbar />
        <div className='content'>
          <div className='title'>
            <h2>{title}</h2>
            <Link to='/'><Button>Back</Button></Link>
          </div>
          { image && <img src={image}/> }
          <div dangerouslySetInnerHTML={{ __html : body }} />
        </div>
      </div>
    )
	}
}

function mapStateToProps( state, props ) {
  const posts = state && state.posts
  if ( posts ) {
    const id = props.match.params.post
    const post = posts.find( p => p['id'] === id )
    return { post }
  }
  return { post : undefined }
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( { getPosts }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( View )
