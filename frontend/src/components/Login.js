import React, { useState } from "react";

function Login({ handleLogin }) {
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
    handleLogin(password, email)
  }

  return (
    <div className="register">
      <p className="register__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" placeholder="Email" id="email" name="email" type="email" value={data.email} onChange={handleChange} />
        <input className="register__input" placeholder="Пароль" id="password" name="password" type="password" value={data.password} onChange={handleChange} />
        <button type="submit" className="register__link">Войти</button>
      </form>
    </div>
  )

}

export default Login;
