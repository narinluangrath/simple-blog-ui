import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { API_SERVER } from '../../config'

import './Preview.scss'

function Preview( { id, title, body, image, date } ) {
  return (
    <Link to={`post/${id}`} style={{textDecoration: 'none'}} >
      <Media>
        { image && 
        <Media.Left>
          <img width={72} height={72} src={image} alt="thumbnail" />
        </Media.Left>
        }
        <Media.Body>
          <Media.Heading>{title}</Media.Heading>
          <p>
            {`(${new Date(date).toLocaleString()}) ` + 
              body.replace( /<.*?>/g, '' ).replace( /&nbsp;/g, ' ' ).substring(0, 300) + '...'}
          </p>
        </Media.Body>
      </Media>  
    </Link>
  )
}

export default Preview
