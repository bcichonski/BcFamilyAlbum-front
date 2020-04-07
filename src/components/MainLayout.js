import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Sidebar from './Sidebar'
import IconButton from '@material-ui/core/IconButton'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import backendDataToDirectoryService from '../services/directoryTreeService'

class MainLayout extends Component {
    constructor() {    
        super(...arguments);    
        this.state = {      
            visible: true,
            directoryTree: {}    
        };
    }

    componentDidMount() {
        const self = this;
        fetch('https://localhost:44332/familyalbum')
        .then(res => res.json())
        .then((data) => {
          self.setState({ directoryTree: backendDataToDirectoryService(data) })
        })
        .catch(console.log);
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

                        <Sidebar treeData={this.state.directoryTree}></Sidebar>
                    </Grid>            
                </Grid>
            )
            showMenuFab = (
                <span></span>
            )
        }

        return (
            <Grid container style={{height: '100vh'}}>
                {sidebar}
                <Grid item xs={10}>
                    <Paper>main viewer</Paper>
                    {showMenuFab}
                </Grid>
            </Grid>  
        )
    }
}

export default MainLayout