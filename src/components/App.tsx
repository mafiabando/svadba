import "../styles/global.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import DragComponent from "./DragComponent";
import WeddingPage from "./WeddingPage";
import GalleryPage from "./GalleryPage";
import VisitPage from "./VisitPage";
import LocationPage from "./LocationPage";
import DressPage from "./DressPage";
import ScrollingText from "./ScrollingText";
import WishesPage from "./WishesPage";
import FormPage from "./FormPage";
import ContactPage from "./ContactPage";
import GalleryComponent from "./GalleryComponent";
import FooterPage from "./FooterPage";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  // Задержка перед показом новой страницы
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        setShowNextPage(true);
      }, 100); // 500ms — время анимации исчезновения текущей страницы
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  return (
    <div className="app">
      {/* Фон */}
      <div className={`background ${isUnlocked ? "unlocked" : ""}`} />

      {/* Основной контент */}
      {!isUnlocked && (
        <div className={`current-page`}>
          <Header />
          <DragComponent onTargetReached={() => setIsUnlocked(true)} />
        </div>
      )}

      {/* Новая страница */}
      {showNextPage && (
        <WeddingPage />
      )}

      {/* Убедитесь, что GalleryPage не отображается, пока новая страница не открыта */}
      {showNextPage && <GalleryPage />}
      {showNextPage && <GalleryComponent/>}
      {showNextPage && <VisitPage/>}
      {showNextPage && <LocationPage/>}
      {showNextPage && <DressPage/>}
      {showNextPage && <ScrollingText/>}
      {showNextPage && <WishesPage/>}
      {showNextPage && <FormPage/>}
      {showNextPage && <ContactPage/>}
      {showNextPage && <FooterPage/>}
    </div>
  );
}

export default App;
