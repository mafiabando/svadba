import React, { useState } from "react";
import "../styles/form-page.css"; // Импортируем CSS

const FormPage: React.FC = () => {
  // Состояние для хранения данных формы
  const [attendance, setAttendance] = useState<string | null>(null);
  const [names, setNames] = useState<string>("");
  const [drinkPreferences, setDrinkPreferences] = useState<string[]>([]);

  // Функция для обработки отправки формы
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = {
    attendance,
    names,
    drinkPreferences
  };

  try {
    const response = await fetch("https://svadba-server-1.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.text(); // Получаем ответ как текст

    if (result.includes("success")) {
      alert("Форма успешно отправлена!");
      setAttendance(null);
      setNames("");
      setDrinkPreferences([]);
    } else {
      alert("Ошибка при отправке формы.");
      console.error(result);
    }

  } catch (error) {
    console.error("Ошибка сети:", error);
    alert("Произошла ошибка при отправке данных.");
  }
};

  return (
    <div className="form-page">
      <h1 className="form-title">Анкета гостя</h1>
      <p className="form-text">
        Пожалуйста, подтвердите своё присутствие на торжестве до 19.08.2025 г.
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
        </div>

        {/* Имя и Фамилия */}
        <div className="form-section">
          <h3 className="form-section_title form-title_name">Имя и Фамилия</h3>
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
              value="кр вино"
              checked={drinkPreferences.includes("кр вино")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "кр вино"]
                    : prev.filter((item) => item !== "кр вино")
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
              value="бел вино"
              checked={drinkPreferences.includes("бел вино")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "бел вино"]
                    : prev.filter((item) => item !== "бел вино")
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
              value="коньяк"
              checked={drinkPreferences.includes("коньяк")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "коньяк"]
                    : prev.filter((item) => item !== "коньяк")
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
              value="самогон"
              checked={drinkPreferences.includes("самогон")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "самогон"]
                    : prev.filter((item) => item !== "самогон")
                )
              }
            />
            Самогон
          </label>
          <br />
          <label className="form-label">
            <input
              className="form-checkbox"
              type="checkbox"
              name="drink"
              value="водка"
              checked={drinkPreferences.includes("водка")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "водка"]
                    : prev.filter((item) => item !== "водка")
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
              value="шампанское"
              checked={drinkPreferences.includes("шампанское")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "шампанское"]
                    : prev.filter((item) => item !== "шампанское")
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
              value="без алк"
              checked={drinkPreferences.includes("без алк")}
              onChange={(e) =>
                setDrinkPreferences((prev) =>
                  e.target.checked
                    ? [...prev, "без алк"]
                    : prev.filter((item) => item !== "без алк")
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