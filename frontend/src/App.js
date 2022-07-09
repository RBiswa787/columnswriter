import './App.css';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from "react-router-dom"
import EditProfile from './Pages/EditProfile';
import NewArticle from './Pages/NewArticle';
import ViewDraft from './Pages/ViewDraft';
import ViewReview from './Pages/ViewReview';


function App() {
  return (
    <Routes>
        <Route path="/" element={ <Auth/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/editprofile" element={ <EditProfile/>}/> 
        <Route path="/newarticle" element={ <NewArticle/>}/> 
        <Route path="/viewdraft/:draftid" element = {<ViewDraft/>}/>
        <Route path="/viewreview/:reviewid" element = {<ViewReview/>}/>
    </Routes>
  );
}

export default App;
