import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import DirectoryTree from './DirectoryTree'

class Sidebar extends Component {
    render() {

        return (
            <Grid container           
                direction="column"
                justify="flex-start"
                alignItems="flex-start"          
                >
                <Grid item>
                    <DirectoryTree treeData={this.props.treeData}
                        expandedTreeNodes={this.props.expandedTreeNodes}
                        onNodeSelect={this.props.onNodeSelect}
                        onNodeToggle={this.props.onNodeToggle}
                        selectedNodeId={this.props.selectedNodeId}></DirectoryTree>
                </Grid>
                <Grid item>
                    <Paper>sidebar</Paper>
                </Grid>               
            </Grid>
            
        )
    }
}

Sidebar.propTypes = {
    treeData : PropTypes.object,
    expandedTreeNodes : PropTypes.arrayOf(PropTypes.string),
    onNodeSelect : PropTypes.func,
    onNodeToggle : PropTypes.func,
    selectedNodeId: PropTypes.string
  }

export default Sidebar