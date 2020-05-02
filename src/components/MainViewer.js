import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { LoadingSpinner, Player } from 'video-react'
import '../../node_modules/video-react/dist/video-react.css'
import ViewerActionBar from './ViewerActionBar'
import TitleBar from './TitleBar'

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
              height='100%'
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
              <TitleBar title={this.props.itemLabel}/>
              <ViewerActionBar 
                onDelete={this.props.onDelete}
                deleteEnabled={this.props.deleteEnabled}
                onRotate={this.props.onRotate}
                rotateEnabled={this.props.rotateEnabled}
                ></ViewerActionBar>
              <IconButton className='main-view-nav main-view-nav-prev rectangular' onClick={this.props.onPrev}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton className='main-view-nav main-view-nav-next rectangular' onClick={this.props.onNext}>
                  <KeyboardArrowRightIcon />
              </IconButton>
          </Paper>
        )
    }
}

MainViewer.propTypes = {
  itemLabel : PropTypes.string,
  itemType : PropTypes.string,
  itemUrl : PropTypes.string,
  onDelete : PropTypes.func,
  onRotate: PropTypes.func,
  onPrev : PropTypes.func,
  onNext : PropTypes.func,
  deleteEnabled : PropTypes.bool,
  rotateEnabled : PropTypes.bool
}

export default MainViewer;