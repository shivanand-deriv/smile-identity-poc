import React from 'react';
import reactLogo from './assets/react.svg';
import smileId from './assets/smileid.png';

const Logos: React.FC = () => {
    return (
        <><div className="logos-container">
            <a href="https://docs.usesmileid.com/" target="_blank" rel="noopener noreferrer">
                <img src={smileId} className="logo smileid" alt="SmileID logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div><h1>SmileID + React</h1></>
    );
};

export default Logos;
