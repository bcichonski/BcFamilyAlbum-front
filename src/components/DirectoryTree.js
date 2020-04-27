import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    )

    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={this.props.selectedNodeId}
        expanded={this.props.expandedTreeNodes}
        onNodeSelect={this.props.onNodeSelect}
        onNodeToggle={this.props.onNodeToggle}
      >
        {renderTree(this.props.treeData)}
      </TreeView>
    )
  }
}

DirectoryTree.propTypes = {
  treeData: PropTypes.object,
  onNodeSelect: PropTypes.func,
  onNodeToggle: PropTypes.func,
  selectedNodeId: PropTypes.string,
  expandedTreeNodes: PropTypes.arrayOf(PropTypes.string)
}

DirectoryTree.defaultProps = {
  expandedTreeNodes: []
};

export default DirectoryTree;