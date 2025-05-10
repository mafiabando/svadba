import React, { useState } from "react";
import "../styles/gallery-component.css"; // Импортируем CSS
import Modal from './Modal'; // Импортируем компонент модального окна

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

    return (
        <>
            <div className="gallery-component">
                <div className="gallery-inner">
                    {["vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png", "vovan.png"].map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Фото ${index + 1}`}
                            onClick={() => openModal(src)} // Открытие модального окна при нажатии
                        />
                    ))}
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal}
            >
                <img src={selectedImage} alt="Модальное изображение" />
            </Modal>
        </>
    );
};

export default GalleryComponent;
