import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    paper: {
        borderRadius: "10",
        width : "10%"
    }
  }));

const Author = () => {
  const classes= useStyles();
  return (
    <Paper elevation={5} className={classes.paper}>
        <Typography>Hello</Typography>
    </Paper>
  )
}

export default Author