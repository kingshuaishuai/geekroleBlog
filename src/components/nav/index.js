import React from 'react';
import { Link } from 'gatsby';
import { window } from 'browser-monads'; 
import logo from '../../images/geekrole-logo.svg';
import './nav.css';

const Nav = () => (
  <nav>
    <div className="nav__items">
      <a className="nav__item--left" href="/"><img src={logo} alt="Geekrole" className="nav__item--logo"/></a>
      <Link className={window.location.href.indexOf('opensource') > 0 ? 'nav__item--link active' : 'nav__item--link'}
        to="/contact">OpenSource</Link>
      <Link className={window.location.href.indexOf('blog') > 0 || window.location.href.indexOf('category') > 0 ? 'nav__item--link active' : 'nav__item--link'}
        to="/blog">Blog</Link>
      <Link className={window.location.href.indexOf('series') > 0 || window.location.href.indexOf('seriesblog') > 0 ? 'nav__item--link active' : 'nav__item--link'}
        to="/blog">Series</Link>
      <Link className={window.location.href.indexOf('contact') > 0 ? 'nav__item--link active' : 'nav__item--link'}
        to="/blog">Contact</Link>
      <Link className={window.location.href.indexOf('about') > 0 ? 'nav__item--link active' : 'nav__item--link'}
        to="/blog">About</Link> 
    </div>
  </nav>
)

export default Nav;