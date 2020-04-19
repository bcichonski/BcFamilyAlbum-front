import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class DirectoryTree extends Component {
    constructor() {    
      super(...arguments);   
      
      let expandedState = []
      const stateStr = localStorage.getItem('directoryTreeState')
      if(stateStr) {
        expandedState = JSON.parse(stateStr)
      }
          
      this.state = {      
          expanded: expandedState
      };
    }

    componentDidMount() {
    }

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
            defaultExpandIcon={<ChevronRightIcon />}
            selected={this.props.selectedNodeId}
            expanded={this.state.expanded}
            onNodeSelect={this.props.onNodeSelect}
            onNodeToggle={(event, nodeIds) => this.nodeToggle(event, nodeIds)}
          >
            {renderTree(this.props.treeData)}
          </TreeView>
        )
    }

    nodeToggle(event, nodeIds) {
      localStorage.setItem('directoryTreeState', JSON.stringify(nodeIds))
      this.setState({
        expanded: nodeIds
      })
    }
}

DirectoryTree.propTypes = {
  treeData : PropTypes.object,
  onNodeSelect : PropTypes.func,
  selectedNodeId : PropTypes.string
}

export default DirectoryTree;