import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import DirectoryTree from './DirectoryTree'

class Sidebar extends React.Component {
    render() {

        return (
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="flex-start">
                <Grid item>
                    <DirectoryTree></DirectoryTree>
                </Grid>
                <Grid item>
                    <Paper>sidebar</Paper>
                </Grid>               
            </Grid>
            
        )
    }
}

export default Sidebar