import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Sidebar from './Sidebar'
import MainViewer from './MainViewer'
import IconButton from '@material-ui/core/IconButton'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackendService from '../services/BackendService'

class MainLayout extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: true,
            directoryTree: {},
            selectedNode: null,
            cache: []
        };
        this.service = new BackendService('https://localhost:44332/')
    }

    componentDidMount() {
        const self = this
        const selectedNodeId = localStorage.getItem('directoryTreeSelectedNodeId')

        this.service.fetchAlbumInfo((data) => {
            self.createCache(data)
            const selectedNode = self.state.cache[selectedNodeId]

            self.setState({
                directoryTree: data,
                selectedNode: selectedNode
            })
        })
    }

    createCacheInternal(cache, node, prevLeaf) {
        if (typeof node.id !== 'undefined') {
            cache[node.id] = node
        }

        if (node.children) {
            for (const subitem of node.children) {
                //this is required for faster navigation through the tree
                subitem.parent = node
                subitem.label = (node?.label ?? '') + '\\' + subitem.name

                if ((subitem.children?.length ?? 0) === 0) {
                    if (prevLeaf) {
                        prevLeaf.nextLeaf = subitem
                    }

                    subitem.prevLeaf = prevLeaf
                    prevLeaf = subitem
                }

                prevLeaf = this.createCacheInternal(cache, subitem, prevLeaf)
            }
        }

        return prevLeaf
    }

    createCache(data) {
        const cache = {}

        this.createCacheInternal(cache, data)

        this.setState({
            cache
        })

        if (this.defaultNodeSelected) {
            this.nodeSelected(null, this.defaultNodeSelected)
        }
    }

    findSelectedNode(nodeId) {
        return this.state?.cache[nodeId] ?? undefined
    }

    endsWithAny(suffixes, string) {
        for (let suffix of suffixes) {
            if (string.endsWith(suffix))
                return true;
        }
        return false;
    }

    render() {

        let sidebarXs = 0
        let sidebar = (
            <span />
        )

        let showMenuFab = (
            <Fab aria-label="show sidebar" className="Show-menu-fab" size="small"
                onClick={() => {
                    this.setState({
                        visible: true
                    })
                }}>
                <ArrowForwardIosIcon />
            </Fab>
        )

        if (this.state.visible) {
            sidebar = (
                <Grid item xs style={{ height: '100%' }}>
                    <Grid container alignItems="flex-end" direction="column"
                        style={{
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            height: '100%',
                            flexGrow: 0,
                            flexWrap: 'nowrap'
                        }}>
                        <Grid item className='hide-menu'>
                            <IconButton aria-label="hide menu" onClick={() => {
                                this.setState({
                                    visible: false
                                })
                            }}>
                                <MenuOpenIcon />
                            </IconButton>
                        </Grid>

                        <Sidebar treeData={this.state.directoryTree}
                            onNodeSelect={(event, value) => this.nodeSelected(event, value)}
                            selectedNodeId={(this.state.selectedNode?.id.toString() ?? "0")}>
                        </Sidebar>
                    </Grid>
                </Grid>
            )
            showMenuFab = (
                <span></span>
            )
            sidebarXs = 2
        }

        let itemType = 'nothing'
        const itemLabel = this.state.selectedNode?.label ?? ''
        const itemName = this.state.selectedNode?.name ?? ''
        if (itemName.includes('.')) {
            if (this.endsWithAny(['.avi', '.mkv', '.mp4'], itemName)) {
                itemType = 'video'
            } else {
                itemType = 'picture'
            }
        }

        const itemUrl = this.service.getItemUrl(this.state.selectedNode?.id)

        return (
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={sidebarXs} style={{ height: '100%' }} id='sidebar-div'>
                    {sidebar}
                </Grid>
                <Grid item xs={12 - sidebarXs} style={{ height: '100%' }}>
                    <MainViewer
                        onDelete={() => { this.deleteNode() }}
                        onRotate={() => { this.rotateNode() }}
                        onPrev={() => { this.prevNode() }}
                        onNext={() => { this.nextNode() }}
                        itemLabel={itemLabel}
                        itemType={itemType}
                        itemUrl={itemUrl}>
                    </MainViewer>
                    {showMenuFab}
                </Grid>
            </Grid>
        )
    }

    nodeSelected(event, value) {
        localStorage.setItem('directoryTreeSelectedNodeId', value)
        if (this.state.cache) {
            this.setState({
                selectedNode: this.findSelectedNode(value)
            })
        } else {
            this.defaultNodeSelected = value
        }
    }

    deleteNode() {
        this.service.deleteItem(this.state.selectedNode.id, (id) => {
            this.nextNode()

            const newTree = this.cloneTreeDeepWith(this.state.directoryTree, (node) => {
                return (node.id !== id)
            })

            this.setState({
                directoryTree: newTree,
                cache: this.createCache(newTree)
            })
        })
    }

    rotateNode() {
        this.service.rotateItem(this.state.selectedNode.id, (id) => {
            this.forceUpdate()
        })
    }

    cloneTreeDeepWith(source, predicate) {
        if (predicate(source)) {
            const newSource = {
                id: source.id,
                name: source.name,
                children: []
            }

            if(source.children) {
                for (let child of source.children) {
                    if (predicate(child)) {
                        newSource.children.push(this.cloneTreeDeepWith(child, predicate));
                    }
                }
            }
            
            return newSource;
        }
    }

    prevNode() {
        const currentNode = this.state.selectedNode

        this.setState({
            selectedNode: currentNode.prevLeaf
        })
    }

    nextNode() {
        const currentNode = this.state.selectedNode

        this.setState({
            selectedNode: currentNode.nextLeaf
        })
    }
}

export default MainLayout