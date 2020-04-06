import React from 'react'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Sidebar from './Sidebar'
import IconButton from '@material-ui/core/IconButton'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class MainLayout extends React.Component {
    constructor() {    
        super(...arguments);    
        this.state = {      
            visible: true    
        };
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

                        <Sidebar></Sidebar>
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