import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./admin.css";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Admin = () => {
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const { setAdmin } = useUser();

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
      .post(`${process.env.REACT_APP_API_URL}/admin/login`, data)
      .then(({ data: { credential } }) => {
        setAdmin({
          token: credential,
        });
        localStorage.setItem("jwt", credential);
        navigator("/AdminPanel");
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
    <div className="adminContainer">
      <div className="wrapperAdmin">
        <h1 className="titleAdmin">admin</h1>
        <p className="errorAdmin">{error}</p>
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
          <div className="buttonAdmin">
            <button type="submit" className="buttonAdminStyle">
              Envoyer{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
