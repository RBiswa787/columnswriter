import React,{useState,useContext,useEffect} from 'react'
import NavBar from '../Components/NavBar';
import useWindowDimensions from '../Components/windowDimensions';
import {Button, Drawer, Typography,Container, Toolbar} from '@material-ui/core';
import {DehazeRounded,ArrowForwardIosRounded} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core'
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    maindiv: {
        display: "flex",
        justifyContent: "center",
    },
  }));
  

const ViewDraft = () => {
let params = useParams();
  const { uname,accesstok,setAccesstok,setUname,globalname } = useContext(UserContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false);
  const [saved, setSaved] = useState([]);
   const handleToggle = () => {
     setToggle(!toggle);
   }
const [value, setValue] = useState("**Hello world!!!**");
const [desc, setDesc] = useState("");
const [title, setTitle] = useState("");
const handleTitle = (val) => {
    setTitle(val);
}
const handleDesc = (val) => {
  setDesc(val);
}
const handleSignout = () => {
  const payloadtoken = {"username": uname, "accesstoken":"Logged Out"};
  axios.post('http://localhost:7878/api/creator/token',payloadtoken);
  setAccesstok("Logged Out");
  setUname("null");
  navigate('/');
}
const redirectEditProfile = () => {
  navigate('/editprofile');
}
const redirectDashboard = () => {
  navigate('/dashboard');
}
const redirectNewArticle = () => {
  navigate('/newarticle');
}
const handleSave = () => {
  const savepayload = {
    "username": uname,
    "title": title,
    "description": desc,
    "markdown": value,
    "accesstoken": accesstok,
    "id": `${params.draftid}`
  }
  axios.post('http://localhost:7878/api/article/updateArticle',savepayload)
  .then(
    response => {
    console.log(response.data.message);
    window.location.reload();
}
  )
  .catch (
    err => {
        console.log(err.message);
    }
  )
}
const handleSubmit = () => {
    const savepayload = {
      "username": uname,
      "accesstoken": accesstok,
      "status": 1,
      "id": `${params.draftid}`
    }
    axios.post('http://localhost:7878/api/article/updateStatus',savepayload)
    .then(
      response => {
      console.log(response.data.message);
      window.location.reload();
  }
    )
    .catch (
      err => {
          console.log(err.message);
      }
    )
  }
useEffect(() => {
    console.log(params.draftid)
    axios.post("http://localhost:7878/api/article/getarticle",{"id":`${params.draftid}`})
  .then(
    response => {
      setSaved(response.data);
      console.log(JSON.stringify(response.data));
      setValue(response.data.markdown);
      setTitle(response.data.title);
      setDesc(response.data.description);
    }
  )
  .catch(
    err => {
      console.log(err.message);
    }
  )
  },[]);

  const { height, width } = useWindowDimensions();
  return (
      <div className={classes.display}>
      <NavBar>
      {
          width >=900 && (
            <>
            <Button style={{marginLeft: "auto"}} onClick={redirectDashboard}>Dashboard</Button>
            <Button style={{}}  onClick={redirectEditProfile}>Edit Profile</Button>
            <Button style={{}} onClick={redirectNewArticle}>New Article</Button>
            <Button style={{marginRight: "5%"}} onClick={handleSignout}>Sign Out</Button>
            </>
          )
        }
      {width<=900 && (
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
        <Button style={{}} onClick={redirectDashboard}>Dashboard</Button>
        <Button style={{}} onClick={redirectEditProfile}>Edit Profile</Button>
        <Button style={{}} onClick={redirectNewArticle}>New Article</Button>
        <Button style={{marginRight: "5%"}} onClick={handleSignout}>Sign Out</Button>
      </Drawer>
      <div style={{display: "flex", flexDirection: "column",justifyContent: "center",alignItems: "center"}}>
      <div style={{display: "flex", width: "70%", marginTop: "2%",flexDirection: "column"}}>
      <Typography style={{fontSize: 35,fontFamily:"Inria Sans",marginLeft: "0%",fontWeight: "bold"}}>
           {saved.title}
         </Typography>
      <Typography style={{fontSize: 25,fontFamily:"Inria Sans",textAlign: "right",marginRight: "0%"}}>
           by {saved.name}
    </Typography>
    </div>
      <div style={{display: "flex", width: "70%", marginTop: "2%",flexDirection: "column"}}>
      <MDEditor.Markdown source={saved.markdown} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
        <div style={{display: "flex", width: "85%", marginTop: "2%",flexDirection: "column"}}>
            <Typography style={{fontSize:23}}>Title</Typography>
            <input style={{width: "100%",marginTop: "1.2%",fontSize:18}} value={title} onChange={(e)=>{handleTitle(e.target.value)}}></input>
        </div>
        <div style={{display: "flex", width: "85%", marginTop: "2%",flexDirection: "column"}}>
            <Typography style={{fontSize:23}}>Description</Typography>
            <input style={{width: "100%",marginTop: "1.2%",fontSize:18}} value={desc} onChange={(e)=>{handleDesc(e.target.value)}}></input>
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
        color: "white",fontSize: 14,marginTop :"2%", marginBottom: "2%",marginLeft: "3%",borderRadius:7}} onClick = {handleSave}>Save</Button>
        <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#083C7A",
        color: "white",fontSize: 14,marginTop :"2%", marginBottom: "2%",marginLeft: "3%",borderRadius: 7}} onClick = {handleSubmit}>Submit</Button>
        </div>
      </div>
      </div>
  )
}

export default ViewDraft