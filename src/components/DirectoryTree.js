import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import { makeStyles } from '@material-ui/core/styles'

class DirectoryTree extends Component {

    render() {

        const classes = makeStyles({
            root: {
              height: 110,
              flexGrow: 1,
              maxWidth: 400,
            },
          });
  
        const renderTree = (nodes) => (
          <TreeItem key={nodes.id?.toString()} nodeId={nodes.id?.toString()} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
          </TreeItem>
        )
      
        return (
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={this.props.onNodeSelect}
          >
            {renderTree(this.props.treeData)}
          </TreeView>
        )
    }
}

DirectoryTree.propTypes = {
  treeData : PropTypes.object,
  onNodeSelect : PropTypes.func
}

export default DirectoryTree;