import axios from 'axios'
import { API_SERVER } from '../../config'
import { POST } from '../constants'

function getPosts( token ) {

  const posts = axios.get( API_SERVER + `/?token=${token}` )
  return { type : POST, payload : posts }

}

export default getPosts
