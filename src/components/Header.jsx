import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutw, SelectisAuth } from '../redux/slices/auth';


function Header(props){
  const dispatch = useDispatch();
  const isAuth = useSelector(SelectisAuth);
  const userData = useSelector(state => state.auth.data);

  const OnClickLogout = () => {
    if (window.confirm("Вийти з акаунту?")){
    dispatch(logoutw());
    window.localStorage.removeItem('token');
    }
  };

  return(
    <header>
      <div className="flex items-center justify-between pt-5 pb-5">
      <div className="flex items-center	">
        <a href="/">
          <p className="text-4xl mb-2 ml-4 font-bold">
            KurspilerJS
          </p>
        </a>
      </div>
      <div className="flex items-center	">
        {isAuth ? (
          <>
            <p className="text-2xl mb-4 mr-4 font-bold">
              {userData.fullName}
            </p>
            <Link to="/login">
              <button className="mb-4 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" onClick={OnClickLogout} variant="contained">Вийти</button>
            </Link>
          </>
          ) : (
          <>
            <Link to="/login">
              <button className="mt-0 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0">Увійти</button>
            </Link>
            <Link to="/register">
              <button className="mt-0 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0">Створити акаунт</button>
            </Link>
          </>
          )}
      </div>
      </div>
      
      
    </header>
  );
}

export default Header;