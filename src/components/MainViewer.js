import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../node_modules/video-react/dist/video-react.css'
import Paper from '@material-ui/core/Paper'
import { Player } from 'video-react';

class MainViewer extends Component {

    render() {
        
        let subitem = (<span />)
        if(this.props.itemType === "picture") {
          subitem = (
            <img style={{objectFit: 'cover', maxWidth:'100%', maxHeight:'100%'}} 
              src={this.props.itemUrl} 
              alt={this.props.itemName}
              className="center">
            </img>
          )
        } else if(this.props.itemType === "video") {
          subitem = (
            <Player
              src={this.props.itemUrl}
            />
          )
        }

        return (
          <Paper style={{height: '100%', width: '100%'}}>
              {subitem}
          </Paper>
        )
    }
}

MainViewer.propTypes = {
  itemLabel : PropTypes.string,
  itemType : PropTypes.string,
  itemUrl : PropTypes.string
}

export default MainViewer;