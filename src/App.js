import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login"
import SearchPage from "./pages/searchPage"
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Profil from "./pages/profil";

import Enquete from "./components/editenquete";
import Question from "./components/question";
// import Form from "./pages/form"
import Results from "./components/commentaire";
import Client from "./pages/clientRedirect";
import AvisClient from "./pages/avisclient";




function App() {
  return (
    <Router>
      <div className="App">
        
            <Routes>
              {/* <Route exact path="/" element={<Form/>} /> */}
              <Route exact path="/" element={<Login />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/avisclient/:userName" element={< AvisClient />} />
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/pages/dashboard" element={<Dashboard/>}/>
              <Route path="/pages/dashboard/userprofil" element={<Profil/>}/>
              {/* <Route path="/pages/dashboard/userprofil/update" element={<EditProfil/>}/> */}
              <Route path="/pages/dashboard/enquete" element={<Enquete/>}/>
              <Route path="/pages/dashboard/enquete/question" element={<Question/>}/>
              <Route path="/pages/dashboard/enquete/results" element={<Results/>}/>
              <Route path="/clientredirection" element={<Client/>}/>
            </Routes>
          </div>
    </Router>
  );
}

export default App;