import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchUserData, SelectisAuth } from '../../redux/slices/auth';

function Login() {
  const isAuth = useSelector(SelectisAuth)
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, 
    formState: { errors, isValid }} = useForm({
    defaultValues:{
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if(!data.payload){
      alert('Помилка авторизації');
    }
    
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    } 
  };
  
  if (isAuth){
    return <Navigate to="/"/>
  }

  return (
      <div className="text-center">
        <p className="text-4xl mb-6 font-bold">
          Авторизація
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !w-3/12" label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', {required: 'Заповніть поле'})}/><br/>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !w-3/12" label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', {required: 'Заповніть поле'})}/><br/>
          <button className="mt-0 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" type="submit" size="large" variant="contained">
          Увійти
          </button>
        </form>
      </div>
    );
}

export default Login;