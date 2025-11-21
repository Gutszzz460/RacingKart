import React from 'react';

const Card = ({ children, className = '', title, ...props }) => {
    const cardStyle = {
        background: 'var(--bg-gradient-card)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-black)',
        boxShadow: 'var(--shadow-pop)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '100%',
    };

    const headerStyle = {
        borderBottom: '2px dashed var(--color-gray-800)',
        paddingBottom: '12px',
        marginBottom: '8px',
        textAlign: 'center',
    };

    return (
        <div style={cardStyle} className={className} {...props}>
            {title && (
                <div style={headerStyle}>
                    <h2 style={{ color: 'var(--color-primary)', textShadow: '2px 2px 0px var(--color-black)' }}>{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
