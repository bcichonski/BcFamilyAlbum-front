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
        fetch('https://localhost:44332/familyalbum')
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
    }

    findSelectedNode(nodeId) {
        return this.state?.cache[nodeId]
    }
 
    render() {

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
                <Grid item xs>
                    <Grid container alignItems="flex-end" direction="column">
                        <Grid item>
                            <IconButton aria-label="hide menu" onClick={() => {
                                this.setState({
                                    visible : false
                                })
                            }}>
                                <MenuOpenIcon />
                            </IconButton>
                        </Grid>

                        <Sidebar treeData={this.state.directoryTree} onNodeSelect={(event, value) => {
                            this.setState({
                                selectedNode : this.findSelectedNode(value)
                            })
                        }}></Sidebar>
                    </Grid>            
                </Grid>
            )
            showMenuFab = (
                <span></span>
            )
        }

        return (
            <Grid container style={{height: '100vh'}}>
                <Grid item xs={2}>
                    {sidebar}
                </Grid>             
                <Grid item xs={10}>
                    <MainViewer itemLabel={this.state.selectedNode?.name ?? ''}></MainViewer>
                    {showMenuFab}
                </Grid>
            </Grid>  
        )
    }
}

export default MainLayout