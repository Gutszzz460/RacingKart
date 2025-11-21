import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const tracks = [
    { id: 1, name: 'Sunny Beach', difficulty: 1, color: '#00E5FF' },
    { id: 2, name: 'Magma Mountain', difficulty: 3, color: '#FF3333' },
    { id: 3, name: 'Neon City', difficulty: 2, color: '#9900FF' },
];

const DifficultyStars = ({ count }) => (
    <div style={{ color: 'var(--color-accent-yellow)', fontSize: '1.2rem' }}>
        {'★'.repeat(count)}{'☆'.repeat(3 - count)}
    </div>
);

const TrackSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="full-screen flex-center" style={{ flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Button onClick={() => navigate('/garage')} variant="secondary">⬅ BACK</Button>
            </div>

            <h1 style={{ fontSize: '4rem', color: 'var(--color-white)', textShadow: '4px 4px 0px var(--color-black)' }}>
                SELECT TRACK
            </h1>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {tracks.map((track) => (
                    <Card key={track.id} style={{ width: '300px', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => navigate('/hud')}>
                        <div style={{
                            width: '100%',
                            height: '150px',
                            background: track.color,
                            borderRadius: 'var(--radius-md)',
                            border: 'var(--border-black)',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem'
                        }}>
                            🛣️
                        </div>
                        <h2 style={{ fontSize: '1.8rem' }}>{track.name}</h2>
                        <DifficultyStars count={track.difficulty} />
                        <Button style={{ marginTop: '10px', width: '100%' }}>RACE!</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TrackSelection;
