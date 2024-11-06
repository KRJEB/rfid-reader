/* AppFrame.js */
import React from 'react';
import './AppFrame.css'; // Import CSS for styling
import firstImage from './first-image.png';
import secondImage from './second-image.png';

const AppFrame = () => {
    return (
        <div className="frame">
            <div className="box">
                <img src={firstImage} alt="First" className="firstImage" />
                <img src={secondImage} alt="Second" className="secondImage" />
            </div>
        </div>
    );
};

export default AppFrame;
