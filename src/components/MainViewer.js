import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

class MainViewer extends Component {

    render() {
      
        return (
          <Paper>
              {this.props.itemLabel}
          </Paper>
        )
    }
}

MainViewer.propTypes = {
  itemLabel : PropTypes.number,
  itemType : PropTypes.string,
  itemUrl : PropTypes.string
}

export default MainViewer;