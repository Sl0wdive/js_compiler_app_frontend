import React from 'react';
import Button from '@mui/material/Button';
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
            <p>
              {userData.fullName}
            </p>
            <Link to="/login">
              <Button onClick={OnClickLogout} className={styles.button} variant="contained">Вийти</Button>
            </Link>
          </>
          ) : (
          <>
            <Link to="/login">
              <Button className={styles.button} variant="contained">Увійти</Button>
            </Link>
            <Link to="/register">
              <Button className={styles.button} variant="contained">Створити акаунт</Button>
            </Link>
          </>
          )}
      </div>
    </header>
  );
}

export default Header;