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
            expandedTreeNodes: [],
            selectedNode: null,
            deleteEnabled: true,
            rotateEnabled: true,
            searchPhrase: ''
        };
        this.service = new BackendService('https://localhost:44332/')
    }

    componentDidMount() {
        const self = this
        const selectedNodeId = localStorage.getItem('directoryTreeSelectedNodeId')

        this.service.fetchAlbumInfo((data) => {
            self.createCache(data)
            const selectedNode = self.cache[selectedNodeId]

            let expandedTreeNodes = []
            const stateStr = localStorage.getItem('directoryTreeState')
            if (stateStr) {
                try {
                    expandedTreeNodes = JSON.parse(stateStr)
                } catch {
                    console.warn("There was a problem with reading the album tree state.")
                }
            }

            self.setState({
                directoryTree: data,
                selectedNode,
                expandedTreeNodes,
            })

            self.ensureNodeIsUnfolded(selectedNode)
        })
    }

    createCacheInternal(cache, node, prevLeaf) {
        if (typeof node.id === 'undefined') {
            node.id = 'thealbum'
        }

        cache[node.id] = node

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
        this.cache = {}
        this.createCacheInternal(this.cache, data)

        if (this.defaultNodeSelected) {
            this.nodeSelected(this.defaultNodeSelected)
        }
    }

    findSelectedNode(nodeId) {
        return this?.cache[nodeId] ?? undefined
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

                        <Sidebar treeData={this.filterDirectoryTree()}
                            onNodeSelect={(event, value) => this.nodeSelected(value)}
                            onNodeToggle={(event, nodeIds) => this.nodeToggle(nodeIds)}
                            selectedNodeId={(this.state.selectedNode?.id.toString() ?? "0")}
                            expandedTreeNodes={this.state.expandedTreeNodes}
                            searchPhrase={this.state.searchPhrase}
                            onSearchPhraseChange={(event) => this.searchPhraseChanged(event)}
                            >
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

    filterDirectoryTree() {
        if(this.state.searchPhrase === '')
        {
            return this.state.directoryTree
        }


    }

    searchPhraseChanged(text) {
        this.setState({
            searchPhrase : text
        })
    }

    nodeSelected(value) {
        localStorage.setItem('directoryTreeSelectedNodeId', value)
        if (this.cache) {
            this.setState({
                selectedNode: this.findSelectedNode(value)
            })
            this.defaultNodeSelected = null
        } else {
            this.defaultNodeSelected = value
        }
    }

    deleteNode() {
        this.setState({
            deleteEnabled: false
        })
        this.service.deleteItem(this.state.selectedNode.id, (id) => {
            const currentNode = this.state.selectedNode

            if (currentNode.prevLeaf) {
                if (currentNode.nextLeaf) {
                    currentNode.nextLeaf.prevLeaf = currentNode.prevLeaf
                    currentNode.prevLeaf.nextLeaf = currentNode.nextLeaf
                } else {
                    currentNode.prevLeaf.nextLeaf = null
                }
            } else {
                currentNode.nextLeaf.prevLeaf = null
            }

            this.nextNode()

            const newTree = this.cloneTreeDeepWith(this.state.directoryTree, (node) => {
                return (node.id !== id)
            })

            this.cache = {}
            this.createCacheInternal(this.cache, newTree)

            this.setState({
                directoryTree: newTree
            })
        },
            () => {
                this.setState({
                    deleteEnabled: true
                })
            })
    }

    rotateNode() {
        this.setState({
            rotateEnabled: false
        })
        this.service.rotateItem(this.state.selectedNode.id, (id) => {
            this.forceUpdate()
        },
            () => {
                this.setState({
                    rotateEnabled: true
                })
            })
    }

    cloneTreeDeepWith(source, predicate) {
        if (predicate(source)) {
            const newSource = {
                id: source.id,
                name: source.name,
                children: []
            }

            if (source.children) {
                for (let child of source.children) {
                    if (predicate(child)) {
                        newSource.children.push(this.cloneTreeDeepWith(child, predicate));
                    }
                }
            }

            return newSource;
        }
    }

    setCurrentNode(newNode) {
        if (newNode) {
            this.setState({
                selectedNode: newNode
            })
        }

        this.ensureNodeIsUnfolded(newNode)
    }

    prevNode() {
        this.setCurrentNode(this.state.selectedNode?.prevLeaf)
    }

    nextNode() {
        this.setCurrentNode(this.state.selectedNode?.nextLeaf)
    }

    ensureNodeIsUnfolded(node) {
        let currentNode = node
        let expandedNodes = [...this.state.expandedTreeNodes]
        let nodeWasAdded = false

        while (currentNode) {
            if ((currentNode.children?.length ?? 0) > 0
                && !expandedNodes.includes(currentNode.id)) {
                expandedNodes.push(currentNode.id)
                nodeWasAdded = true
            }

            currentNode = currentNode.parent
        }

        if (nodeWasAdded) {
            this.nodeToggle(expandedNodes)
        }
    }

    nodeToggle(nodeIds) {
        localStorage.setItem('directoryTreeState', JSON.stringify(nodeIds))
        this.setState({
            expandedTreeNodes: nodeIds
        })
    }
}

export default MainLayout