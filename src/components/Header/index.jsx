import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logoutw, SelectisAuth } from '../../redux/slices/auth';

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
    <header className={styles.header}>
      <div className={styles.HeaderLeft}>
      </div>
      <div className={styles.HeaderRight}>
        {isAuth ? (
          <>
            <p className="text-2xl mb-4 mr-4 font-bold">
              {userData.fullName}
            </p>
            <Link to="/login">
            <button className="mt-0 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" onClick={OnClickLogout} variant="contained">Вийти</button>
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
    </header>
  );
}

export default Header;