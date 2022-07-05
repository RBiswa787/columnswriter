import React,{useState} from 'react'
import TemporaryDrawer from '../Components/Drawer';
import NavBar from '../Components/NavBar';
import useWindowDimensions from '../Components/windowDimensions';
import {Button, Drawer, Typography,Container, Toolbar,Paper} from '@material-ui/core';
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
  

const Auth = () => {
  const classes = useStyles();
  const [toggle,setToggle] = useState(false);
   const handleToggle = () => {
     setToggle(!toggle);
   }
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  function handleName(val) {
    setName(val);
  }
  function handleEmail(val) {
    setEmail(val);
  }
  function handlePassword(val) {
    setPassword(val);
  }
  const handleSubmit = () => {
    console.log(email);
    console.log(password);
  }
  const handleRegister = () => {
    console.log(name);
    console.log(email);
    console.log(password);
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
      
        
        {
            
            width>=1300 && (
            <div style={{display: "flex", width: "100%", height: height, justifyContent: "center",alignItems: "center",background: "#3B95FF"}}>
            <Paper style={{display: "flex", width: 0.5*width, height: 0.6*height,justifyContent: "space-around",alignItems: "center", background:"white",borderRadius: 10, elevation: 20}}>
            <div style={{display: "flex",flexDirection: "column",width: "40%", height: "90%"}}>
                <Typography style={{fontSize: 30, color: "#105AB1",marginTop: "5%", fontWeight: "bold",fontFamily: 'Inria Sans',textAlign: "center"}}>
                    Sign In
                </Typography>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Email
                </Typography>
                <input type="email" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}}
                onChange={e=>handleEmail(e.target.value)}/>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Password
                </Typography>
                <input type="password" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}}
                onChange={e=>handlePassword(e.target.value)}/>
                <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "10%",width: "25%", background: "#083C7A",
               color: "white",fontSize: 12,marginTop :"12%", marginBottom: "2%",alignSelf: "center",borderRadius: 7}} onClick={handleSubmit}>Submit</Button>
            </div>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",width: "5%", height: "20%"}}>
            <Typography style={{fontSize: 20, color: "black",marginTop: "5%",fontFamily: 'Inria Sans',}}>
                    OR
                </Typography>
            </div>
            <div style={{display: "flex",flexDirection: "column",width: "40%", height: "90%"}}>
            <Typography style={{fontSize: 30, color: "#105AB1",marginTop: "5%", fontWeight: "bold",fontFamily: 'Inria Sans',textAlign: "center"}}>
                    Register
                </Typography>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    First Name
                </Typography>
                <input type="text" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}}
                onChange={e=>handleName(e.target.value)} />
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Email
                </Typography>
                <input type="email" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
                onChange={e=>handleEmail(e.target.value)}/>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Password
                </Typography>
                <input type="password" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
               onChange={e=>handlePassword(e.target.value)}/>
                <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "10%",width: "25%", background: "#083C7A",
               color: "white",fontSize: 12,marginTop :"7%", marginBottom: "2%",alignSelf: "center",borderRadius: 7}} onClick={handleRegister}>Register</Button>
            </div>
        </Paper>
        </div>
            )
        }
        {
            width<1300 && (
                <div style={{display: "flex", width: "100%", height: 1.5*height,justifyContent: "center",background: "#3B95FF"}}>
            <Paper style={{display: "flex",flexDirection :"column", width: 0.95*width, height: 1.2*height,justifyContent: "space-around",alignItems: "center", background:"white",borderRadius: 10, elevation: 20,marginTop: "3%"}}>
            <div style={{display: "flex",flexDirection: "column",width: "80%", height: "40%"}}>
                <Typography style={{fontSize: 30, color: "#105AB1",marginTop: "10%", fontWeight: "bold",fontFamily: 'Inria Sans',textAlign: "center"}}>
                    Sign In
                </Typography>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Email
                </Typography>
                <input type="email" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
                onChange={e=>handleEmail(e.target.value)}/>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Password
                </Typography>
                <input type="password" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
                onChange={e=>handlePassword(e.target.value)}/>
                <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "10%",width: "25%", background: "#083C7A",
               color: "white",fontSize: 12,marginTop :"12%", marginBottom: "2%",alignSelf: "center",borderRadius: 7}} onClick={handleSubmit}>Submit</Button>
            </div>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",width: "5%", height: "20%"}}>
            <Typography style={{fontSize: 20, color: "black",marginTop: "1%",fontFamily: 'Inria Sans',}}>
                    OR
                </Typography>
            </div>
            <div style={{display: "flex",flexDirection: "column",width: "80%", height: "70%"}}>
            <Typography style={{fontSize: 30, color: "#105AB1",marginTop: "2%", fontWeight: "bold",fontFamily: 'Inria Sans',textAlign: "center"}}>
                    Register
                </Typography>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    First Name
                </Typography>
                <input type="text" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
                onChange={e=>handleName(e.target.value)}/>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Email
                </Typography>
                <input type="email" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}} 
                onChange={e=>handleEmail(e.target.value)}/>
                <Typography style={{fontSize: 20, marginTop: "5%",fontFamily: "Inria Sans", marginLeft: "7%"}}>
                    Password
                </Typography>
                <input type="password" style = {{width: "80%",marginLeft:"7%",marginTop: "3%",fontSize: 18,fontFamily: "Inria Sans",borderRadius: 30,paddingLeft: "2%"}}
                onChange={e=>handlePassword(e.target.value)} />
                <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "10%",width: "30%", background: "#083C7A",
               color: "white",fontSize: 12,marginTop :"7%", marginBottom: "2%",alignSelf: "center",borderRadius: 7}} onClick={handleRegister}>Register</Button>
            </div>
        </Paper>
        </div>
            )
        }
      
      </div>
  )
}

export default Auth