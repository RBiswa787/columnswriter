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
  

const NewArticle = () => {
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
      <div style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
        <div style={{display: "flex", width: "85%", marginTop: "2%",flexDirection: "column"}}>
            <Typography style={{fontSize:27}}>Title</Typography>
            <input style={{width: "100%",marginTop: "1.2%",fontSize:23}} value={title} onChange={(e)=>{handleTitle(e.target.value)}}></input>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
      <MDEditor
        value={value}
        onChange={setValue}
        height= {325}
        style={{marginTop: "3%",width: "85%"}}
      />
      </div>
      <div style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
         <div style={{display: "flex", width: "85%", marginTop: "2%",justifyContent: "right",marginBottom :"5%"}}>
         <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#3B95FF",
        color: "white",fontSize: 14,marginTop :"2%", marginBottom: "2%",marginLeft: "3%",borderRadius:7}}>Save</Button>
        <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#083C7A",
        color: "white",fontSize: 14,marginTop :"2%", marginBottom: "2%",marginLeft: "3%",borderRadius: 7}}>Submit</Button>
        </div>
      </div>
      </div>
  )
}

export default NewArticle