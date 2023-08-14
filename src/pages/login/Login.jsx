import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./login.css";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const { setUser } = useUser();

  const loginSchema = yup
    .object({
      email: yup.string().max(100).required("Veuillez entrer votre email"),
      password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 characters")
        .required("veuillez entrer votre mot de passe"),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, data)
      .then(({ data: { credential, role } }) => {
        console.log(role)
        console.log(credential)
        setUser({
          token: credential,
          role: role,
        });
        localStorage.setItem("jwt", credential);
        navigator("/");
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          setError(message);
        }
      );
  };

  return (
    <div className="loginContainer">
      <div className="wrapperLogin">
        <h1 className="titleLogin">Login</h1>
        <p className="errorLogin">{error}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.email && <p>{errors.email.message}</p>}
          <label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
          </label>
          {errors.password && <p>{errors.password?.message}</p>}
          <label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              {...register("password")}
            />
          </label>
          <div className="buttonLogin">
            <button type="submit" className="buttonLoginStyle">
              Envoyer{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
