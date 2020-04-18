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
      const selectedState = localStorage.getItem('directoryTreeSelected')

      this.setState({
        selected: selectedState
      })
      
      this.props.onNodeSelect(null, selectedState)
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
            selected={this.state.selected}
            expanded={this.state.expanded}
            onNodeSelect={(event, value) => this.nodeSelect(event, value)}
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

    nodeSelect(event, value) {
      localStorage.setItem('directoryTreeSelected', value)
      this.setState({
        selected: value
      })
      this.props.onNodeSelect(event, value)
    }
}

DirectoryTree.propTypes = {
  treeData : PropTypes.object,
  onNodeSelect : PropTypes.func
}

export default DirectoryTree;