import React, { useState } from "react";
import "../styles/form-page.css"; // Импортируем CSS

const FormPage: React.FC = () => {
  // Состояние для хранения данных формы
  const [attendance, setAttendance] = useState<string | null>(null);
  const [names, setNames] = useState<string>("");
  const [drinkPreferences, setDrinkPreferences] = useState<string[]>([]);

  // Функция для обработки отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      attendance,
      names,
      drinkPreferences,
    });
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <div className="form-page">
      <h1 className="form_title">Анкета гостя</h1>
      <p className="form_text">
        Пожалуйста, подтвердите своё присутствие на торжестве до 01.12.2023 г.
      </p>

      {/* Форма */}
      <form className="form" onSubmit={handleSubmit}>
        {/* Присутствие на торжестве */}
        <div className="form-section">
          <h3 className="form-section_title">Присутствие на торжестве</h3>
          <label className="form-label">
            <input
              className="form-radio"
              type="radio"
              name="attendance"
              value="coming"
              checked={attendance === "coming"}
              onChange={() => setAttendance("coming")}
            />
            Я приду / Мы придем
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-radio"
              type="radio"
              name="attendance"
              value="not-coming"
              checked={attendance === "not-coming"}
              onChange={() => setAttendance("not-coming")}
            />
            Прийти не получится
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-radio"
              type="radio"
              name="attendance"
              value="with-partner"
              checked={attendance === "with-partner"}
              onChange={() => setAttendance("with-partner")}
            />
            Буду со своей парой (+1)
          </label>
        </div>

        {/* Имя и Фамилия */}
        <div className="form-section">
          <h3 className="form-section_title">Имя и Фамилия</h3>
          <div className="form-section_textarea_container">
          <textarea
            className="form-section_textarea"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="если вы будете с парой или семьей, то внесите все имена"
            rows={3}
          />
          </div>
        </div>

        {/* Предпочтения по напиткам */}
        <div className="form-section">
          <h3 className="form-section_title">Предпочтения по напиткам</h3>
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="red-wine"
              checked={drinkPreferences.includes("red-wine")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "red-wine"]
                    : prev.filter((item) => item !== "red-wine")
                )
              }
            />
            Вино красное
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="white-wine"
              checked={drinkPreferences.includes("white-wine")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "white-wine"]
                    : prev.filter((item) => item !== "white-wine")
                )
              }
            />
            Вино белое
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="cognac"
              checked={drinkPreferences.includes("cognac")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "cognac"]
                    : prev.filter((item) => item !== "cognac")
                )
              }
            />
            Коньяк
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="vodka"
              checked={drinkPreferences.includes("vodka")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "vodka"]
                    : prev.filter((item) => item !== "vodka")
                )
              }
            />
            Водка
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="champagne"
              checked={drinkPreferences.includes("champagne")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "champagne"]
                    : prev.filter((item) => item !== "champagne")
                )
              }
            />
            Шампанское
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="non-alcoholic"
              checked={drinkPreferences.includes("non-alcoholic")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "non-alcoholic"]
                    : prev.filter((item) => item !== "non-alcoholic")
                )
              }
            />
            Безалкогольное
          </label>
        </div>

        {/* Кнопка отправки */}
        <button type="submit" className="submit-button">
          Отправить
        </button>
      </form>
    </div>
  );
};
export default FormPage;