import React,{useState,useContext,useEffect} from 'react'
import NavBar from '../Components/NavBar';
import useWindowDimensions from '../Components/windowDimensions';
import {Button, Drawer, Typography,Container, Toolbar, Paper} from '@material-ui/core';
import {DehazeRounded,ArrowForwardIosRounded} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { GitHub,Twitter,LinkedIn } from '@material-ui/icons';
import axios from "axios";


const useStyles = makeStyles((theme)=>({
    maindiv: {
        display: "flex",
        justifyContent: "center",
    },
    socials: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "25%",
      height: "7%",
      marginTop: "7%",
    },
    socialicongithub: {
      color: "black",
      '&:hover': {
        color: "#646464",
      }
    },
    socialiconlinkedin: {
      color: "#0077b5",
      '&:hover': {
        color: "#646464",
      }
    },
    socialicontwitter: {
      color: "#00acee",
      '&:hover': {
        color: "#646464",
      }
    },
  }));
  

const Dashboard = () => {
  const { uname,accesstok,setAccesstok,setUname,globalname,setGlobalname } = useContext(UserContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [toggle,setToggle] = useState(false);
  const [imageURL, setImageURL]  = useState('https://i.ibb.co/GRxVwGZ/ppppp.png');
  const [name, setName]  = useState('Enter Your Name');
  const [desig, setDesig]  = useState('Your Designation');
  const [about, setAbout]  = useState('Write something not about yourself!');
  const [githubURL, setGithubURL]  = useState('github.com');
  const [linkedInURL, setLinkedInURL]  = useState('linkedin.com');
  const [twitterURL, setTwitterURL]  = useState('twitter.com');
  const [drafts, setDrafts]  = useState([]);
  const [reviews, setReviews]  = useState([]);
  const [published, setPublished]  = useState([]);
  const payload = {"username":uname,"accesstoken":accesstok};
  axios.post('http://localhost:7878/api/creator/getprofile',payload)
  .then(
    response => {
        setImageURL(response.data.image);
        setName(response.data.name);
        setDesig(response.data.position);
        setAbout(response.data.about);
        setGithubURL(response.data.github);
        setLinkedInURL(response.data.linkedin);
        setTwitterURL(response.data.twitter);
    }
  ).catch(
    err => {
        console.log(err.message);
    }
  );
  const handleToggle = () => {
     setToggle(!toggle);
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
  const handleOpen = (val) => {
    navigate(`/viewdraft/${val}`);
  }
  const handleReviewOpen = (val) => {
    navigate(`/viewreview/${val}`);
  }
  useEffect(() => {
    axios.post("http://localhost:7878/api/article/userdraftarticle",{"username":uname})
  .then(
    response => {
      setDrafts(response.data);
    }
  )
  .catch(
    err => {
      console.log(err.message);
    }
  )
  axios.post("http://localhost:7878/api/article/userreviewarticle",{"username":uname})
  .then(
    response => {
      setReviews(response.data);
    }
  )
  .catch(
    err => {
      console.log(err.message);
    }
  )
  axios.post("http://localhost:7878/api/article/userpublisharticle",{"username":uname})
  .then(
    response => {
      setPublished(response.data);
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
      {width<900 && (
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
        <Button style={{}}onClick={redirectNewArticle}>New Article</Button>
        <Button style={{marginRight: "5%"}} onClick={handleSignout}>Sign Out</Button>
      </Drawer>
      <div style={{display: "flex",flexDirection: "row",justifyContent: "space-around", alignItems: "center", width: width,marginTop: "3%"}}>
      <Paper style={{display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", width: "45%",background: "white",minHeight:"500px"}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "15%",aspectRatio: 1,backgroundImage: `url(${imageURL})`,
        borderRadius:"50%",backgroundPosition:"center",backgroundSize:"cover",marginTop: "3%"
        }}>
        </div>
        <Typography style={{fontSize: 25,fontFamily:"Inria Sans",marginTop: "2%"}}>{name}</Typography>
        <Typography style={{fontSize: 18,fontFamily:"Inria Sans",marginTop: "1%"}}>{desig}</Typography>
        <Typography style={{fontSize: 15,fontFamily:"Inria Sans",marginTop: "1%",textAlign:"center",textJustify: "center"}}>
       {about}
        </Typography>
        <Container className={classes.socials}>
                <GitHub style={{width: "33%",fontSize: 35}} className={classes.socialicongithub}></GitHub>
                <LinkedIn style={{width: "33%",fontSize: 35}} className={classes.socialiconlinkedin}></LinkedIn>
                <Twitter style={{width: "33%",fontSize: 35}} className={classes.socialicontwitter}></Twitter>
              </Container>
      </Paper>
      </div>
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "3%"}}>
        <Typography style={{fontSize: 30,fontFamily:"Inria Sans",marginLeft: "10%"}}>
          Draft
        </Typography>
      </div >
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "1%",marginBottom: "7%"}}>        
        {
         drafts.map(draft => <Paper style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: 0.7*width,marginTop: "1%",paddingTop: "1%",paddingBottom: "2%",marginLeft: "10%",borderLeft: "20px solid grey",borderRadius: 10}}>
         <Typography style={{fontSize: 27,fontFamily:"Inria Sans",marginLeft: "5%",fontWeight: "bold"}}>
           {draft.title}
         </Typography>
         <Typography style={{fontSize: 19,fontFamily:"Inria Sans",textAlign: "right",marginRight: "5%"}}>
           {draft.name}
         </Typography>
         <Typography style={{fontSize: 18,fontFamily:"Inria Sans",marginLeft: "5%",marginRight: "5%",marginTop:"2%",textAlign: "justify"}}>
         {draft.description}
         </Typography>
         <div style={{display: "flex",justifyContent: "right",  width: '90%',marginTop: "1%",marginLeft: "5%"}}>
         <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#3B95FF",
       color: "white",fontSize: 14,marginTop :"1%",marginLeft: "3%",borderRadius:7}} onClick = {() => {handleOpen(`${draft.id}`)}}>Open</Button>
         </div>
       </Paper> )
        }
      </div>
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "3%"}}>
        <Typography style={{fontSize: 30,fontFamily:"Inria Sans",marginLeft: "10%"}}>
          Under Review
        </Typography>
      </div >
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "1%",marginBottom: "7%"}}>        
        {
         reviews.map(review => <><Paper style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: 0.7*width,marginTop: "1%",paddingTop: "1%",paddingBottom: "2%",marginLeft: "10%",borderLeft: "20px solid #1A83FF",borderRadius: 10}}>
         <Typography style={{fontSize: 27,fontFamily:"Inria Sans",marginLeft: "5%",fontWeight: "bold"}}>
           {review.title}
         </Typography>
         <Typography style={{fontSize: 19,fontFamily:"Inria Sans",textAlign: "right",marginRight: "5%"}}>
           {review.name}
         </Typography>
         <Typography style={{fontSize: 18,fontFamily:"Inria Sans",marginLeft: "5%",marginRight: "5%",marginTop:"2%",textAlign: "justify"}}>
         {review.description}
         </Typography>
         <div style={{display: "flex",justifyContent: "right",  width: '90%',marginTop: "1%",marginLeft: "5%"}}>
         <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#3B95FF",
       color: "white",fontSize: 14,marginTop :"1%",marginLeft: "3%",borderRadius:7}} onClick = {() => {handleReviewOpen(`${review.id}`)}}>Open</Button>
         </div>
       </Paper> </>)
        }
      </div>
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "3%"}}>
        <Typography style={{fontSize: 30,fontFamily:"Inria Sans",marginLeft: "10%"}}>
          Published
        </Typography>
      </div >
      <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: width,marginTop: "1%",marginBottom: "7%"}}>        
        {
         published.map(publish => <><Paper style={{display: "flex",flexDirection: "column",justifyContent: "space-around",  width: 0.7*width,marginTop: "1%",paddingTop: "1%",paddingBottom: "2%",marginLeft: "10%",borderLeft: "20px solid #083C7A",borderRadius: 10}}>
         <Typography style={{fontSize: 27,fontFamily:"Inria Sans",marginLeft: "5%",fontWeight: "bold"}}>
           {publish.title}
         </Typography>
         <Typography style={{fontSize: 19,fontFamily:"Inria Sans",textAlign: "right",marginRight: "5%"}}>
           {publish.name}
         </Typography>
         <Typography style={{fontSize: 18,fontFamily:"Inria Sans",marginLeft: "5%",marginRight: "5%",marginTop:"2%",textAlign: "justify"}}>
         {publish.description}
         </Typography>
         <div style={{display: "flex",justifyContent: "right",  width: '90%',marginTop: "1%",marginLeft: "5%"}}>
         <Button style={{display: "flex", justifyContent: "center",alignItems: "center", height: "4%",width: "7%", background: "#3B95FF",
       color: "white",fontSize: 14,marginTop :"1%",marginLeft: "3%",borderRadius:7}}>Open</Button>
         </div>
       </Paper> </>)
        }
      </div>
      </div>
  )
}

export default Dashboard