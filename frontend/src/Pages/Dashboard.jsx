import React,{useState} from 'react'
import TemporaryDrawer from '../Components/Drawer';
import NavBar from '../Components/NavBar';
import useWindowDimensions from '../Components/windowDimensions';
import {Button, Drawer, Typography,Container, Toolbar} from '@material-ui/core';
import {DehazeRounded,ArrowForwardIosRounded} from '@material-ui/icons';
import Author from '../Components/Author';
import { makeStyles } from '@material-ui/core'
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles((theme)=>({
    maindiv: {
        display: "flex",
        justifyContent: "center",
    },
  }));
  

const Dashboard = () => {
  const classes = useStyles();
  const [toggle,setToggle] = useState(false);
   const handleToggle = () => {
     setToggle(!toggle);
   }
const [value, setValue] = useState("**Hello world!!!**");
const [title, setTitle] = useState("");
const handleTitle = (val) => {
    setTitle(val);
}
  const { height, width } = useWindowDimensions();
  return (
      <div className={classes.display}>
      <NavBar>
      {width<=600 && (
        <Toolbar style={{position: "absolute",marginLeft: "83%",marginTop: "0.5%"}}>
          <DehazeRounded onClick={handleToggle} style={{color: "black", width: "100%"}}></DehazeRounded>
        </Toolbar>
            )}
      </NavBar>
      <Drawer
      anchor='right'
      open={toggle}
      style={{width: "500px"}}
      >
        <Container style={{width: "300px"}}>
          <ArrowForwardIosRounded onClick={handleToggle} style={{marginTop: "8%",fontSize:"medium",color: "grey"}}>Close</ArrowForwardIosRounded>
        </Container>
      </Drawer>
      </div>
  )
}

export default Dashboard