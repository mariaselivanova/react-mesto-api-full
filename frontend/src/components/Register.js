import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [data, setData] = useState({
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, email } = data;
    handleRegister(password, email)
  }

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" placeholder="Email" id="email" name="email" type="email" value={data.email} onChange={handleChange} />
        <input className="register__input" placeholder="Пароль" id="password" name="password" type="password" value={data.password} onChange={handleChange} />
        <button type="submit" className="register__link">Зарегистрироваться</button>
      </form>
      <div className="register__info">
        <p className="register__signin">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin-link">
          Войти
        </Link>
      </div>
    </div>
  )


}

export default Register;
