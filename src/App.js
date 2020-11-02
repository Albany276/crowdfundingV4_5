import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// By importing as, it means that from now now we will be able to just call it Router
import Nav from "./components/Nav/Nav";
import Title from "./components/Title/Title";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import './App.css';
import NewProjectPage from './pages/NewProjectPage';
import LogoutPage from './pages/LogoutPage';
import PledgePage from './pages/PledgePage';
import DeleteProjectPage from './pages/DeleteProjectPage';

function App() {
  return(
    
    <Router>
      <Title />
      {/* <Nav /> The nav is now within the Title component  */}
      
      <div>
        
        <Switch>
          <Route path="/projects/:id"><ProjectPage /></Route> 
          <Route path="/update/:id"><UpdateProjectPage /></Route> 
          <Route path="/pledge/:id"><PledgePage /></Route> 
          <Route path="/login"><LoginPage /></Route>
          <Route path="/logout"><LogoutPage /></Route>
          <Route path="/createproject"><NewProjectPage /></Route>
          <Route path="/deleteproject/:id"><DeleteProjectPage /></Route>
          <Route path="/users/:id"><UserPage /></Route>
          <Route path="/"><HomePage /></Route> 
          {/* ---->>>> Put the home page at the end, otherwise the links do not quite work */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
