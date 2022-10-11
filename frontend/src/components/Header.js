import logo from "./../images/logopic.svg";
import React from "react";
import { Routes, Route, Link } from "react-router-dom"

function Header({ userEmail, handleLogout }) {
  return (
    <header className="header">
      <a href="#" className="header__link"><img src={logo} alt="лого"
        className="header__logo" /></a>
      <Routes>
        <Route
          exact
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__newlink">
              Войти
            </Link>
          }
        />
        <Route
          exact
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__newlink">
              Регистрация
            </Link>
          }
        />
        <Route
          exact
          path="/"
          element={
            <div className="header__info">
              <p className="header__email">{userEmail}</p>
              <Link onClick={handleLogout} to="/sign-in" className="header__newlink">
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  )
}

export default Header;
