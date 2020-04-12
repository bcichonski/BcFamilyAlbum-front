import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Sidebar from './Sidebar'
import MainViewer from './MainViewer'
import IconButton from '@material-ui/core/IconButton'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class MainLayout extends Component {
    constructor() {    
        super(...arguments);    
        this.state = {      
            visible: true,
            directoryTree: {},
            selectedNode: null    
        };
    }

    componentDidMount() {
        const self = this;
        fetch('https://localhost:44332/albuminfo')
        .then(res => res.json())
        .then((data) => {
            self.setState({ 
              directoryTree: data,
              directoryCache: self.createCache(data) 
            })
        })
        .catch(console.log)
    }

    createCacheInternal(cache, node) {
        if(typeof node.id !== 'undefined') {
            cache[node.id] = node
        }

        if(node.children) {
            for(const subitem of node.children) {
                this.createCacheInternal(cache, subitem)
            }
        }
    }

    createCache(data) {
        const cache = { }
            
        this.createCacheInternal(cache, data)

        this.setState({
            cache
        })

        if(this.defaultNodeSelected) {
            this.nodeSelected(null, this.defaultNodeSelected)
        }
    }

    findSelectedNode(nodeId) {
        return this.state?.cache[nodeId] ?? undefined
    }

    endsWithAny(suffixes, string) {
        for (let suffix of suffixes) {
            if(string.endsWith(suffix))
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
                    visible : true
                })
            }}>
                <ArrowForwardIosIcon />
            </Fab>
        )
        
        if(this.state.visible) {
            sidebar = (
                <Grid item xs style={{height: '100%'}}>
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
                                    visible : false
                                })
                            }}>
                                <MenuOpenIcon />
                            </IconButton>
                        </Grid>

                        <Sidebar treeData={this.state.directoryTree} onNodeSelect={(event, value) => this.nodeSelected(event, value)}>                           
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
        const itemName = this.state.selectedNode?.name ?? ''
        if(itemName.includes('.')) {
            if(this.endsWithAny(['.avi','.mkv', '.mp4'], itemName)) {
                itemType = 'video'
            } else {
                itemType = 'picture'
            }
        }

        const itemUrl = 'https://localhost:44332/albuminfo/'+this.state.selectedNode?.id

        return (
            <Grid container style={{height: '100%'}}>
                <Grid item xs={sidebarXs} style={{height: '100%'}} id='sidebar-div'>
                    {sidebar}
                </Grid>             
                <Grid item xs={12 - sidebarXs} style={{height: '100%'}}>
                    <MainViewer itemLabel={itemName} itemType={itemType} itemUrl={itemUrl}></MainViewer>
                    {showMenuFab}
                </Grid>
            </Grid>  
        )
    }

    nodeSelected(event, value) {
        if(this.state.cache) {
            this.setState({
                selectedNode : this.findSelectedNode(value)
            })
        } else {
            this.defaultNodeSelected = value
        } 
    }
}

export default MainLayout