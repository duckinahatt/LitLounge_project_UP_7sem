import React from "react";
import './Header.css';
import { NavLink } from "react-router-dom";

function Header() {
  console.log("Header component rendered!");
  return (
    <header>
      <NavLink to="/" id="logo" end>
        <img src="./../assets/img/icon_logo.svg" alt="logo" />
        <h1>LitLounge</h1>
      </NavLink>
      <nav>
        <NavLink to="/" end>
          Главная
        </NavLink>
        <NavLink to="/catalog" end>
          Каталог
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
