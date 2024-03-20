import React, { useState } from 'react';
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import {MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
  <nav className="app__navbar">
    <div className="app__navbar-logo">
      <img src={images.access_control_system} alt="app logo" />
    </div>
    <ul className="app__navbar-links">
      <li className='p__opensans'><a href="/">Home</a></li>
      <li className='p__opensans'><a href="/roads">Accsess Control System</a></li>
      <li className='p__opensans'><a href="/waterclock">Water Clock</a></li>
    </ul>
    <div className="app__navbar-login">
      <a href="/login" className="p__opensans">Log In /</a><a href="/register" className="p__opensans">Register</a>
    </div>
    <div className="app__navbar-smallscreen">
      <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
      
      {toggleMenu && (
      <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
        <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
        <ul className="app__navbar-smallscreen_links">
          <li className='p__opensans'><a href="#home">Home</a></li>
          <li className='p__opensans'><a href="#roads">Accsess Control System</a></li>
          <li className='p__opensans'><a href="#waterclock">Water Clock</a></li>
        </ul>
      </div>
      )}
    </div>
  </nav>
  )
  };

export default Navbar;
