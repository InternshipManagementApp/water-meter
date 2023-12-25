import React from 'react';
import images from '../../constants/images';
import '../Design/homeguest.css';

const HomeGuest = () => {
  return (
    <div className="main_partHome">
      <p className="home_title">Internship Z</p>
      <img className="build_img" src={images.epulet} alt="intership" />
      <p className="information">Hello! <br/>
        In the Sapientia University's boarding webpage!
      </p>
      <p className="passToRegisterOrLogin">Don't have an account?<a className='link' href="../register">Register</a></p>
      <p className="passToRegisterOrLogin">Already have an account?<a className='link' href="../login">Login</a></p>
    </div>
  )
};

export default HomeGuest;