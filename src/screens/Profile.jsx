import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import CurrencyDisplay from '../components/CurrencyDisplay';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="full-screen flex-center" style={{ flexDirection: 'column', gap: '20px' }}>
            <CurrencyDisplay />

            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Button onClick={() => navigate('/')} variant="secondary">⬅ BACK</Button>
            </div>

            <h1 style={{ fontSize: '4rem', color: 'var(--color-white)', textShadow: '4px 4px 0px var(--color-black)' }}>
                RACER PROFILE
            </h1>

            <Card style={{ width: '600px', flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                {/* Avatar */}
                <div style={{
                    width: '150px',
                    height: '150px',
                    background: 'var(--color-gray-100)',
                    borderRadius: '50%',
                    border: '4px solid var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    boxShadow: 'var(--shadow-pop)'
                }}>
                    😎
                </div>

                {/* Stats */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>SPEEDSTER_99</h2>
                    <div style={{ fontSize: '1.2rem', color: 'var(--color-gray-800)' }}>
                        <p><strong>Level:</strong> 15</p>
                        <p><strong>Wins:</strong> 42</p>
                        <p><strong>Favorite Kart:</strong> Speedster MK1</p>
                    </div>
                    <div style={{ marginTop: '10px', width: '100%', height: '10px', background: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: '70%', height: '100%', background: 'var(--color-accent-green)' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', textAlign: 'right' }}>XP to Level 16</span>
                </div>
            </Card>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Button variant="primary">EDIT PROFILE</Button>
                <Button variant="accent">ACHIEVEMENTS</Button>
            </div>
        </div>
    );
};

export default Profile;
