import React, { useState } from "react";
import "../styles/gallery-component.css"; // Импортируем CSS
import Modal from "./Modal"; // Импортируем компонент модального окна

const GalleryComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const images = [
    `${process.env.PUBLIC_URL}/photo1.jpg`,
    `${process.env.PUBLIC_URL}/photo2.jpg`,
    `${process.env.PUBLIC_URL}/photo3.jpg`,
    `${process.env.PUBLIC_URL}/photo4.jpg`,
    `${process.env.PUBLIC_URL}/photo5.jpg`,
    `${process.env.PUBLIC_URL}/photo6.jpg`,
    `${process.env.PUBLIC_URL}/photo7.jpg`,
    `${process.env.PUBLIC_URL}/photo8.jpg`
  ];

  const duplicatedImages = [...images, ...images, ...images, ...images, ...images];

  return (
    <>
      <div className="gallery-component">
        <div className="gallery-inner">
          {duplicatedImages.map((src, index) => (
            <img
              className="gallery-image"
              key={index}
              src={src}
              alt={`Фото ${index + 1}`}
              onClick={() => openModal(src)}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <img src={selectedImage} alt="Модальное изображение" />
      </Modal>
    </>
  );
};

export default GalleryComponent;
