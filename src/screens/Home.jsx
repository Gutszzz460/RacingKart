import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import CurrencyDisplay from '../components/CurrencyDisplay';

const Home = () => {
    const navigate = useNavigate();
    const [showTutorial, setShowTutorial] = React.useState(false);

    return (
        <div className="full-screen" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            height: '100vh',
            padding: '40px'
        }}>
            <CurrencyDisplay />

            {/* Top Left Third: Title */}
            <div style={{
                gridColumn: '1 / 3',
                gridRow: '1 / 2',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '5%'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    color: 'var(--color-accent-yellow)',
                    textShadow: '8px 8px 0px var(--color-black)',
                    lineHeight: '0.9',
                    transform: 'rotate(-2deg)',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    SUPER <br />
                    <span style={{ color: 'var(--color-primary)', fontSize: '7rem' }}>KART</span> <br />
                    RACING
                </h1>
            </div>

            {/* Bottom Right Third: Menu */}
            <div style={{
                gridColumn: '3 / 4',
                gridRow: '2 / 4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: '10%'
            }}>
                <Card style={{
                    width: '100%',
                    maxWidth: '600px', // Increased width for grid
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px 40px', // 20px vertical, 40px horizontal gap
                    alignItems: 'stretch',
                    transform: 'rotate(2deg)',
                    borderWidth: '4px'
                }}>
                    <Button onClick={() => navigate('/track-selection')} variant="primary" style={{ fontSize: '2rem' }}>
                        🏁 RACE NOW
                    </Button>

                    <Button onClick={() => navigate('/garage')} variant="secondary">
                        🔧 GARAGE
                    </Button>

                    <Button onClick={() => setShowTutorial(true)} variant="accent" style={{
                        background: 'var(--color-gray-800)',
                        color: 'white',
                        fontSize: '1.5rem', // Made bigger
                        padding: '16px 24px' // Increased padding
                    }}>
                        ❓ HOW TO PLAY
                    </Button>

                    <Button onClick={() => navigate('/profile')} variant="accent">
                        👤 PROFILE
                    </Button>
                </Card>
            </div>

            {/* Decorative Elements (Golden Ratio Circles) */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '50vh',
                height: '50vh',
                borderRadius: '50%',
                border: '20px solid rgba(255,255,255,0.1)',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '20%',
                width: '20vh',
                height: '20vh',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: -1
            }} />

            {showTutorial && (
                <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
                }}>
                    <Card title="HOW TO PLAY" style={{ width: '500px' }}>
                        <ul style={{ listStyle: 'none', fontSize: '1.2rem', lineHeight: '2' }}>
                            <li>🎮 <strong>Controls:</strong> Arrow Keys to Drive</li>
                            <li>🚀 <strong>Spacebar:</strong> Use Power-up</li>
                            <li>⚡ <strong>Shift:</strong> Drift / Boost</li>
                        </ul>
                        <Button onClick={() => setShowTutorial(false)} variant="primary">GOT IT!</Button>
                    </Card>
                </div>
            )}

            <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-15px); }
        }
      `}</style>
        </div>
    );
};

export default Home;
