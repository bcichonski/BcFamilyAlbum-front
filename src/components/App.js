import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Sidebar from './Sidebar';

function App() {
  return (
    <div>
     <Grid container style={{height: '100vh'}}>
        <Grid item xs>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item xs={10}>
          <Paper style={{height: '100%'}}>main viewer</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
