import React from 'react';
import '../Design/home.css';
import Countdown from './CountDown';

const Home = () => {
  return (
    <div className="main_partHome">
      <p className="home_title">Internship</p>
      <p className="information">Hello in the internship's interface! <br/>
        Don't forget to check notifications and if you have any questions
        feel free to post it. <br/>Have a nice day!
      </p>
      <div className="header">
        <p className="notification_title">Notifications</p>
      </div>
      <div className="notifications">
            <h2>Time until you need to upload the consumptition</h2>
            <Countdown/>
      </div>
    </div>
  )
};

export default Home;