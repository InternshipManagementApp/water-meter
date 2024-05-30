import React, { useState, useEffect } from 'react';
import '../Design/countdown.css';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const targetDate = new Date(currentYear, currentMonth, 13); //until next month 13th
    
    if (now > targetDate) { //// If the current date is already past the 13th of the month, then we aim for the 13th of the next month
      targetDate.setMonth(currentMonth + 1);
    }

    const difference = targetDate - now; //millisecond

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => { //update every second
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); //clea if is unmount
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => { //display counter
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="countdown">
      {timerComponents.length ? timerComponents : <span >Time's up!</span>}
    </div>
  );
};

export default Countdown;
