import React from 'react';

import { Home, Login, Register, Navbar, HomeGuest } from './components/index';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import './components/Navbar/Navbar.css';

import AccessControlySystem from './components/Pages/AccessControlSystem';
import Rooms from './components/Pages/Rooms';

const App = () => (

  
  <div>
    <Navbar />
    <React.Fragment>      
      <BrowserRouter>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<HomeGuest />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/roads" element={<AccessControlySystem />} />
            <Route path="/rooms" element={<Rooms />} />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    </React.Fragment>
  </div>
);

export default App;
