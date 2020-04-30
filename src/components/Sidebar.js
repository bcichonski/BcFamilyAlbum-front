import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import DirectoryTree from './DirectoryTree'
import CustomAppBar from './CustomAppBar'

function Sidebar(props) {
    return (
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <CustomAppBar searchPhrase={props.searchPhrase}
                 onSearchPhraseChange={props.onSearchPhraseChange}
                 onTreeFolding={props.onTreeFolding}
                 onHideSidebar={props.onHideSidebar} />
            </Grid>
            <Grid item>
                <DirectoryTree treeData={props.treeData}
                    expandedTreeNodes={props.expandedTreeNodes}
                    onNodeSelect={props.onNodeSelect}
                    onNodeToggle={props.onNodeToggle}
                    selectedNodeId={props.selectedNodeId}></DirectoryTree>
            </Grid>
        </Grid>
    )
}

Sidebar.propTypes = {
    treeData: PropTypes.object,
    expandedTreeNodes: PropTypes.arrayOf(PropTypes.string),
    onNodeSelect: PropTypes.func,
    onNodeToggle: PropTypes.func,
    selectedNodeId: PropTypes.string,
    onSearchPhraseChange: PropTypes.func,
    onHideSidebar: PropTypes.func,
    onTreeFolding: PropTypes.func,
    searchPhrase: PropTypes.string
}

export default Sidebar