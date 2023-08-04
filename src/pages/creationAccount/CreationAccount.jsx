import React from 'react';
import './creationAccount.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const CreationAccount = () => {
  const navigator = useNavigate('');
  const [error, setError] = useState('');

  const loginSchema = yup.object({
    email: yup.string().max(100).required('Veuillez entrer votre email'),
    password: yup.string().min(8, "Le mot de passe doit contenir au moins 8 characters",).required('veuillez entrer votre mot de passe'),
  }).required();

  const { register, formState: { errors }, handleSubmit,} = useForm({resolver : yupResolver(loginSchema)});
  
  const onSubmit = (data) => {
    axios
    .post(`${process.env.REACT_APP_API_URL}/users/`, data)
    .then(() => {
      navigator('/');
    })
    .catch((err) => {
      setError(err.response.data.message);
    });

  };


  return (
    <div className='CreationAccountContainer'>
        <div className='wrapperCreationAccount'>
          <h1 className='titleCreation'>Création d'un compte</h1>
            <p className='errorCreaback'>{error}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <p>{errors.email.message}</p>}
              <label>
                <input 
                type="text" 
                placeholder='Email' 
                name="email" 
                {...register('email')} />
              </label>
              {errors.password && <p>{errors.password.message}</p>}
              <label>
                <input 
                type="password" 
                placeholder='Mot de passe' 
                name='password' {...register('password')}/>
              </label>
              <div className='buttonCreationAccount'>
              <button type="submit" 
              className='buttonCreationAccountStyle'>
                 Envoyer </button>
              </div>
            </form>
        </div>
    </div>
)}

export default CreationAccount;