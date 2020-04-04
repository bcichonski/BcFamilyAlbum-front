import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const classes = makeStyles();

  return (
    <div className={classes.root}>
     <Grid container style={{height: '100vh'}}>
        <Grid item xs>
          <Paper className={classes.paper} style={{height: '100%'}}>sidebar tree</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper} style={{height: '100%'}}>main viewer</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
