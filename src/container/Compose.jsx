import React, { PureComponent } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import ImageUploader from 'react-images-upload';

import Google from '../utils/Google'
import Navbar from './Navbar'
import { API_SERVER } from '../../config'
import './Compose.scss'
import Editor from './Editor'

class Compose extends PureComponent {

	constructor( props ) {
		super( props )
    this.state = { 
      body : '', 
      title : '', 
      isDone : false, 
      image : null, 
      imageURL : [],
    }
    this.handleTitleChange = this.handleTitleChange.bind( this )
    this.handleEditorChange = this.handleEditorChange.bind( this )
    this.submitPost = this.submitPost.bind( this )
    this.onDrop = this.onDrop.bind( this )
	}

  handleEditorChange( value ) {
    this.setState({ body : value })
  }

  handleTitleChange( value ) {
    value.preventDefault()
    const text = value.target.value
    this.setState({ title : text })
  }  

  submitPost() {
    const id_token = Google.getUserIdToken()
    const { title, body, imageURL } = this.state
    axios.post( API_SERVER + '/compose', { title, body, token : id_token, image : imageURL[0] } )
         .then( _ => this.setState({ isDone : true }) )
         .catch( console.error )
    
  }

  onDrop( imageFiles, imageDataURLs ) {
    this.setState( { image : imageFiles, imageURL : imageDataURLs } )
  }

	render() {

    const { title, body, isDone, imageURL } = this.state

    if ( !Google.getUserIdToken() ) {
      return <Redirect to='/login' />
    }

    if ( isDone ) {
      return <Redirect to='/' />
    }

    const cn = 'content' + ( imageURL.length === 1 ? ' uploaded' : '' )

		return (
      <div id='compose'>
        <Navbar />
        <div className={cn}>
          <FormControl 
            bsSize='lg' 
            type="text" 
            onChange={this.handleTitleChange} 
            value={this.state.title} 
            placeholder="Title" 
          />  
          <Editor 
            handleChange={this.handleEditorChange} 
            text={this.state.body} 
          />
          <ImageUploader
            withIcon={false}
            withPreview={true}
            label={'Max file size: 1MB'}
            buttonText='Choose image'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
            maxFileSize={1000000}          
          />
          <div className='buttons'>
            <Link to='/'><Button>Discard</Button></Link>
            <Button bsStyle='primary' onClick={this.submitPost}>Save</Button>
          </div>   
        </div>    
      </div>
    )
	}
}

export default Compose
