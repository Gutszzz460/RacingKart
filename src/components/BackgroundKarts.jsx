import React from 'react';
import kartRed from '../assets/kart_red_v2.png';
import kartBlue from '../assets/kart_blue_v2.png';

const BackgroundKarts = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {/* Kart 1: Red, moving left to right */}
            <img
                src={kartRed}
                alt="Red Kart"
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '-200px',
                    width: '250px',
                    opacity: 0.6,
                    mixBlendMode: 'multiply',
                    filter: 'blur(1px)',
                    animation: 'driveRight 15s linear infinite'
                }}
            />

            {/* Kart 2: Blue, moving right to left (flipped) */}
            <img
                src={kartBlue}
                alt="Blue Kart"
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '-200px',
                    width: '250px',
                    opacity: 0.6,
                    mixBlendMode: 'multiply',
                    filter: 'blur(1px)',
                    transform: 'scaleX(-1)',
                    animation: 'driveLeft 12s linear infinite',
                    animationDelay: '5s'
                }}
            />

            <style>{`
        @keyframes driveRight {
          0% { left: -200px; transform: rotate(0deg); }
          48% { transform: rotate(0deg); }
          50% { transform: rotate(-2deg) translateY(-5px); }
          52% { transform: rotate(0deg); }
          100% { left: 110vw; }
        }
        @keyframes driveLeft {
          0% { right: -200px; transform: scaleX(-1) rotate(0deg); }
          48% { transform: scaleX(-1) rotate(0deg); }
          50% { transform: scaleX(-1) rotate(2deg) translateY(-5px); }
          52% { transform: scaleX(-1) rotate(0deg); }
          100% { right: 110vw; }
        }
      `}</style>
        </div>
    );
};

export default BackgroundKarts;
