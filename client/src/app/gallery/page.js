"use client"
import './gallery.css';
import Nav from "../components/nav/nav.js";
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
    // Fetch the images from the serverless function
    const fetchImages = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-g-images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const imagePaths = await response.json();
        setImageSrcs(imagePaths); // Set the image paths to state
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="body">
      <GalleryContainer handleImageClick={handleImageClick} imageSrcs={imageSrcs} />
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

const GalleryContainer = ({ handleImageClick, imageSrcs }) => {
  return (
    <div className="gallery-container">
      <Nav />
      <div className="gallery-header">
        <h2>Gallery</h2>
        <p>Here are some of the most memorable moments from QUDM</p>
      </div>
      <div className="image-grid">
        {imageSrcs.map((src, index) => (
          <div
            key={index}
            className="image-wrapper"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={src}
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
          src={imageSrcs[currentImageIndex]}
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
