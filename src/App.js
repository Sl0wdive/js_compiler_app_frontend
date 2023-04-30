import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  
  return (
    <div className="Wrapper">
      <Header/>
      <Routes>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;