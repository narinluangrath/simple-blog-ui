import { POST } from '../constants'

export default function postsReducer( state=null, action ) {
  switch ( action.type ) {
    case POST:
      return action && action.payload && action.payload.data || []
  }
  return state
}