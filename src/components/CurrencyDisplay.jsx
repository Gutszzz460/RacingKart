import React from 'react';

const CurrencyDisplay = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '100px', // Moved left to avoid AudioPlayer (which is at right: 20px)
            display: 'flex',
            gap: '15px',
            zIndex: 100
        }}>
            {/* Coins */}
            <div style={{
                background: 'rgba(0,0,0,0.6)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--color-accent-yellow)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-white)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-pop)'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🪙</span> 1,250
            </div>

            {/* Diamonds */}
            <div style={{
                background: 'rgba(0,0,0,0.6)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-white)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-pop)'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💎</span> 50
            </div>
        </div>
    );
};

export default CurrencyDisplay;
