import React, { PureComponent } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class Editor extends PureComponent {

  constructor( props ) {
    super(props)
  }

  render() {
    return (
      <ReactQuill value={this.props.text}
                  onChange={this.props.handleChange} 
      />
    )
  }

}

export default Editor
