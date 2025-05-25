import React from "react";
import "../styles/contact-page.css"; // Импортируем CSS

const ContactPage: React.FC = () => {
  return (
    <>
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-container_border">
              <h1 className="contact-title">организатор</h1>
              <p className="contact-description"> Если Вы подготовили для нас сюрприз или в случае возникновения вопросов, Вы всегда можете обратиться за помощью и согласованием к нашему свадебному организатору</p>
              <span className="contact-name">Annawedding</span>
              <a href='https://t.me/+79618146833' target='_blank'>
              <button className="contact-button">Написать</button>
              </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
