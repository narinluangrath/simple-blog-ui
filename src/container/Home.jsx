import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

import Google from '../utils/Google'
import Navbar from './Navbar'
import Preview from '../presentational/Preview'
import { getPosts } from '../actions'
import './Home.scss'

class Home extends PureComponent {

	constructor( props ) {
		super( props )
	}

  componentDidMount() {
    const token = Google.getUserIdToken()
    if ( token ) {
      this.props.getPosts( token )
    }
  }

	render() {

    const { posts } = this.props

    return (
      <div id='home'>
        <Navbar />
        <div className='content'>
          <div className='composeButton'>
            <Link to='/compose'><Button>Add Post</Button></Link>
          </div>
           {posts && posts.length === 0 ? "It looks like you haven't written anything yet. Click 'add post' to get started!" :
           posts ? posts.map( post => <Preview key={post.id} {...post}/> ) :
           'Loading...'}                     
        </div>
      </div>
    )
	}

}

function mapStateToProps( state ) {
  return { posts : state.posts }
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( { getPosts }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( Home )
