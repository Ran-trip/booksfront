import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

import './contact.css';



const Contact = () => {
  const schema = yup.object({
    nom: yup.string().max(100).required('Veuillez entrer votre nom'),
    prénom: yup.string().max(100).required('veuillez entrer votre prénom'),
    email: yup.string().email('Veuillez entrer un email valide'),
    textarea: yup.string().max(255).required('Veuillez entrer votre message')
  }).required();

  // chercher les informations avec useForm
  // formstate pour afficher les erreurs de l'utilisateur couplé avec yop resolver
  //gérer les erreurs
  //formState contient des objets tel que: error ,isValidad etc

  const { register, formState: { errors }, handleSubmit,} = useForm({resolver : yupResolver(schema)});
  
  const onSubmit = () => {
    alert("Merci d avoir completé le formulaire, nous vous répondrons prochainement"
      
    );
  };

  //useRef form permet d'aller chercher toute les valeurs dans l'input
  const form = useRef();

  const sendEmail = () => {
    

    emailjs.sendForm('service_n4wd2la', 'template_8yn646d', form.current, 'nlRtzJQin8hNDiKfU')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  // ref prend les valeurs dans l'input
  return (
    <div className='contactContainer'>
      <div className='wrapperContact'>
        <h1 className='titreContact'>Contact</h1>
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          {errors.nom && <p>{errors.nom.message}</p>}
          <label>            
            <input type="text" placeholder='Nom' name='nom' {...register('nom')} />
          </label> 
          {errors.prénom && <p>{errors.prénom.message}</p>}      
          <label>         
            <input type="text" placeholder='Prénom' name='prénom' {...register('prénom')} />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
          <label>          
            <input type="text" placeholder='Email' name='email' {...register('email')} />
          </label>       
          {errors.textarea && <p>{errors.textarea.message}</p>}         
          <label> 
            <textarea
                cols="40"
                rows="10"
                placeholder="Votre message"
                {...register('textarea')}
                />
          </label>
         <div  className='buttonContact'>
        <button onClick={sendEmail} type="submit" className='buttonStyle'> Envoyer </button>
          </div>     
        </form>
      </div>  
    </div>
  )
}

export default Contact;