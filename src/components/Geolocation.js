import React from 'react';
import { ImLocation } from 'react-icons/im';

const Geolocation = () => {
  return (
    <button className="geolocation-btn">
      <p>
        <span>
          <ImLocation className="favorite" />
        </span>
        <span>Get Weather Report For Your Location</span>
      </p>
    </button>
  );
};

export default Geolocation;
