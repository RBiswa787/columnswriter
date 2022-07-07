import React from 'react'
import {AppBar,Paper,Typography,Button, Toolbar, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import useWindowDimensions from './windowDimensions';

const useStyles = makeStyles((theme)=>({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        height: "60px",
        background: "white",
    },
    text: {
        color: 'black',
        fontWeight: "bold",
        fontFamily: 'Inria Sans',
    },
    logodiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: "-1%",
        background: "transparent",  
    },
    logo: {
      display: "flex",
      marginLeft: "5%"
    },
    nav: {
      position: "fixed",
      marginLeft: "75%",
    }
  }));

const NavBar = ({children}) => {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  return (
    <AppBar position='static' className={classes.appBar}>
       <Toolbar className={classes.logo}>
        <img src={require("../Assets/logo.png")} alt="logo" style={{height: "60%"}} />
      </Toolbar>
        <Paper elevation={0} className={classes.logodiv}>
            <Typography variant="h6" className={classes.text}>Columns <span style={{color: "#1A83FF"}}>Writer</span></Typography> 
        </Paper>
        {children}
    </AppBar>
  )
}

export default NavBar