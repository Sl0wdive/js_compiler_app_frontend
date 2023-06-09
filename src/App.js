import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { fetchMe } from './redux/slices/auth';

function App() {
  
  const dispatch = useDispatch();

  React.useEffect(() =>{
    dispatch(fetchMe())
  }, []);


  return (
    <div className="Wrapper">
      <Header/>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/:id" element= {<Home/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;