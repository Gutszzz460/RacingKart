import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const karts = [
    { id: 1, name: 'Speedster MK1', color: '#FF0099', speed: 80, accel: 60, handling: 40 },
    { id: 2, name: 'Tank-O-Tron', color: '#33FF00', speed: 40, accel: 30, handling: 90 },
    { id: 3, name: 'Drift King', color: '#9900FF', speed: 60, accel: 80, handling: 70 },
];

const StatBar = ({ label, value, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
        <span style={{ width: '80px', fontWeight: 'bold', textAlign: 'right' }}>{label}</span>
        <div style={{
            flex: 1,
            height: '12px',
            background: 'var(--color-gray-100)',
            borderRadius: 'var(--radius-pill)',
            border: '2px solid var(--color-black)',
            overflow: 'hidden'
        }}>
            <div style={{
                width: `${value}%`,
                height: '100%',
                background: color,
                transition: 'width 0.5s ease-out'
            }} />
        </div>
    </div>
);

const Garage = () => {
    const navigate = useNavigate();
    const [selectedKartIndex, setSelectedKartIndex] = useState(0);
    const kart = karts[selectedKartIndex];

    const nextKart = () => setSelectedKartIndex((prev) => (prev + 1) % karts.length);
    const prevKart = () => setSelectedKartIndex((prev) => (prev - 1 + karts.length) % karts.length);

    return (
        <div className="full-screen flex-center" style={{ flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Button onClick={() => navigate('/')} variant="secondary">⬅ BACK</Button>
            </div>

            <h1 style={{ fontSize: '4rem', color: 'var(--color-white)', textShadow: '4px 4px 0px var(--color-black)' }}>
                MY GARAGE
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Button onClick={prevKart} variant="secondary" style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0 }}>◀</Button>

                <Card style={{ width: '500px', alignItems: 'center' }}>
                    {/* Kart Preview Placeholder */}
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: kart.color,
                        borderRadius: 'var(--radius-md)',
                        border: 'var(--border-black)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                    }}>
                        <span style={{ fontSize: '5rem' }}>🏎️</span>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', color: kart.color, textShadow: '2px 2px 0px var(--color-black)' }}>{kart.name}</h2>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <StatBar label="SPEED" value={kart.speed} color="var(--color-primary)" />
                        <StatBar label="ACCEL" value={kart.accel} color="var(--color-accent-yellow)" />
                        <StatBar label="HANDLING" value={kart.handling} color="var(--color-secondary)" />
                    </div>

                    <Button style={{ marginTop: '20px', width: '100%' }} onClick={() => navigate('/track-selection')}>
                        SELECT KART
                    </Button>
                </Card>

                <Button onClick={nextKart} variant="secondary" style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0 }}>▶</Button>
            </div>
        </div>
    );
};

export default Garage;
