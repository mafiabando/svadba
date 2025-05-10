import React, { useEffect, useState } from 'react';
import '../styles/footer-page.css'; // Import your CSS for styling

const FooterPage: React.FC = () => {
  const targetDate = new Date('2025-09-19T00:00:00'); // Set the target date here
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="footer-page">
      <div className="footer-container">
        <h1 className="footer-title">До свадьбы</h1>
        <span className="footer-text">Осталось:</span>
        <div className="footer-timer">
          <div className="time-section">
            <span className="time-value">{timeRemaining.days}</span>
            <span className="time-label">дней</span>
          </div>
          <span className='separator'>:</span>
          <div className="time-section">
            <span className="time-value">{timeRemaining.hours}</span>
            <span className="time-label">часов</span>
          </div>
          <span className='separator'>:</span>
          <div className="time-section">
            <span className="time-value">{timeRemaining.minutes}</span>
            <span className="time-label">минут</span>
          </div>
          <span className='separator'>:</span>
          <div className="time-section">
            <span className="time-value">{timeRemaining.seconds}</span>
            <span className="time-label">секунд</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;