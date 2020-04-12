import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../node_modules/video-react/dist/video-react.css'
import Paper from '@material-ui/core/Paper'
import { Player, LoadingSpinner } from 'video-react'
import ViewerActionBar from './ViewerActionBar'
import IconButton from '@material-ui/core/IconButton'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

class MainViewer extends Component {

    render() {
        
        let subitem = (<span />)
        if(this.props.itemType === "picture") {
          subitem = (
            <img style={{objectFit: 'cover', maxWidth:'100%', maxHeight:'100%', height:'inherit'}} 
              src={this.props.itemUrl} 
              alt={this.props.itemName}
              className="center">
            </img>
          )
        } else if(this.props.itemType === "video") {
          subitem = (
            <Player
              src={this.props.itemUrl}
              autoPlay={true}
              fluid={false}
            >
              <LoadingSpinner></LoadingSpinner>
            </Player>
          )
        }

        return (
          <Paper style={{height: '100%', width: '100%'}}>
              {subitem}
              <ViewerActionBar></ViewerActionBar>
              <IconButton className='main-view-nav main-view-nav-prev rectangular' onClick={() => {
                    /*this.setState({
                        visible : false
                    })*/
                }}>
                <MenuOpenIcon />
              </IconButton>
              <IconButton className='main-view-nav main-view-nav-next rectangular' onClick={() => {
                    /*this.setState({
                        visible : false
                    })*/
                  }}>
                  <MenuOpenIcon />
              </IconButton>
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