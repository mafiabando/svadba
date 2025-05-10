import React from "react";
import "../styles/location-page.css"; // Импортируем CSS

const LocationPage: React.FC = () => {
  return (
    <>
      <div className="location-page">
        <div className="location-container">
          <div className="location-photo" />
          <div className="location-description" />
          <div className="location-container_border">
            <div className="location-content">
              <a href='https://yandex.ru/maps/-/CHrZnA6n' target='_blank'>
              <button className="location-button">На карту</button>
              </a>
              <h2 className="location-title_top">Локация</h2>
              <h1 className="location-title_bottom">б/з Астраханская</h1>
              <p className="address">
                АСТРАХАНЬ<br />
                ул. Ульяновых, 6/10
              </p>
              <div className="schedule">
                <p>16:30 | СБОР ГОСТЕЙ<br/>
                17:00 | Встреча молодоженов, церемония<br/>
                17:30 |  Свадебный банкет
								</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
