"use client"

import './gallery.css';
import Nav from "../components/nav/nav.js";
import Image from "next/image";
import Footer from "../components/footer/footer.js";
import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageSrcs, setImageSrcs] = useState([]);
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = (e) => {
    // Check if the click event target is the backdrop or one of its children
    if (e.target.classList.contains('lightbox-backdrop')) {
      setIsLightboxOpen(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + imageSrcs.length) % imageSrcs.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % imageSrcs.length);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images/get');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const imageData = await response.json();
        setImageSrcs(imageData.map(image => ({
          src: `/api/images/${encodeURIComponent(image.filename)}`,
          filename: image.filename,
          dateOfCreation: image.dateOfCreation
        })));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);//for getting da images from db

  return (
    <div className="body">
      <GalleryContainer handleImageClick={handleImageClick} imageSrcs={imageSrcs} />{/*added the imgsrcs to the gallery cont*/}
      {isLightboxOpen && (
        <div className="lightbox-backdrop" onClick={handleLightboxClose}>
          <LightboxContainer
            imageSrcs={imageSrcs}
            currentImageIndex={currentImageIndex}
            handlePrevImage={handlePrevImage}
            handleNextImage={handleNextImage}
          />
        </div>
      )}
    </div>
  );
}

const GalleryContainer = ({ handleImageClick, imageSrcs}) => {
  return (
    <div className="gallery-container">
      <Nav />
      <div className="gallery-header">
        <h2>Gallery</h2>
        <p>Here are some of the most memorable moments from QUDM</p>
      </div>
      <div className="image-grid">
        {imageSrcs.map((image, index) => (
        <div
          key={index}
          className="image-wrapper"
          onClick={() => handleImageClick(index)}
        >
          <img
            src={image.src}
            alt={`Image ${index}`}
            style={{
              width: 'auto',
              height: '300px',
              objectFit: 'cover',
            }}
          />
        </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

const LightboxContainer = ({
  imageSrcs,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
  }) => {
    return (
      <div className="lightbox-container">
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="left-button" onClick={handlePrevImage}>
            <img src="images/icons/left.png" alt="Previous" />
          </button>
          <img
            src={imageSrcs[currentImageIndex].src}
            alt="Lightbox"
            className="lightbox-image"
          />
          <button className="right-button" onClick={handleNextImage}>
            <img src="images/icons/right.png" alt="Next" />
          </button>
        </div>
      </div>
    );
};