import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'

function Header(props){
  
  return(
    <header className={styles.header}>
      <div className={styles.HeaderLeft}>
        </div>
        <div className={styles.HeaderRight}>
          {false ? (
            <>
              <Link to="/login">
                <Button className={styles.button} variant="contained">Увійти</Button>
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