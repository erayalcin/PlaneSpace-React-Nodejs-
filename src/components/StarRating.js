import React, { useState } from 'react';
import '../assets/StarRating.css'; // CSS dosyasını da ekliyoruz

const StarRating = () => {
  const [rating, setRating] = useState(0); // Dereceyi takip etmek için state

  // Yıldız tıklama işlemi
  const handleClick = (index) => {
    setRating(index + 1); // Rating değerini güncelle
  };

  // Yıldızları oluştur
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 6; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < rating ? 'filled' : ''}`}
          onClick={() => handleClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      <div className="stars-row">{renderStars().slice(0, 3)}</div>
      <div className="stars-row">{renderStars().slice(3)}</div>
    </div>
  );
};

export default StarRating;
