import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { fetchRegister, SelectisAuth } from '../../redux/slices/auth';


function Register() {
  const isAuth = useSelector(SelectisAuth)
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, 
    formState: { errors, isValid }} = useForm({
    defaultValues:{
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if(!data.payload){
      alert('Помилка реєстрації');
    }
    
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    } 
  };
  
  if (isAuth){
    return <Navigate to="/"/>
  }

  return (
      <div className={styles.forma}>
        <Typography className={styles.zag} variant="h5">
          Створення акаунта
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField className={styles.textF} label="Нікнейм"
          error={Boolean(errors.nickname?.message)}
          helperText={errors.nickname?.message}
          {...register('fullName', {required: 'Заповніть поле'})}/><br/>

          <TextField className={styles.textF} label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', {required: 'Заповніть поле'})}/><br/>

          <TextField className={styles.textF} label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', {required: 'Заповніть поле'})}/><br/>
          <Button type="submit" className={styles.button} size="large" variant="contained">
          Створити
          </Button>
        </form>
      </div>
    );
}

export default Register;