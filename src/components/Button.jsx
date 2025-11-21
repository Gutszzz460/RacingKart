import React from 'react';
import '../styles/variables.css';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = {
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: 'var(--radius-pill)',
        border: 'var(--border-black)',
        boxShadow: 'var(--shadow-pop)',
        transition: 'var(--transition-bounce)',
        position: 'relative',
        top: '0px',
        left: '0px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    };

    const variants = {
        primary: {
            background: 'var(--color-primary)',
            color: 'var(--color-white)',
        },
        secondary: {
            background: 'var(--color-secondary)',
            color: 'var(--color-black)',
        },
        accent: {
            background: 'var(--color-accent-yellow)',
            color: 'var(--color-black)',
        },
        danger: {
            background: '#FF3333',
            color: 'var(--color-white)',
        }
    };

    const style = { ...baseStyle, ...variants[variant] };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
        e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-pop)';
    };

    const handleMouseDown = (e) => {
        e.currentTarget.style.transform = 'scale(0.95) translateY(2px)';
        e.currentTarget.style.boxShadow = '2px 2px 0px var(--color-black)';
    };

    const handleMouseUp = (e) => {
        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
        e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-black)';
    };

    return (
        <button
            style={style}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
