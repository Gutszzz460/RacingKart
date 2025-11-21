import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const url = "https://www.orangefreesounds.com/wp-content/uploads/2019/07/Funny-music-for-arcade-game-loop.mp3";

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        // Attempt auto-play on mount (might be blocked by browser policy)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play prevented:", error);
                // Auto-play failed, so we stay in paused state
            });
        }
    }, []);

    return (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
            <audio ref={audioRef} src={url} loop />
            <Button
                onClick={togglePlay}
                variant="secondary"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    padding: 0,
                    fontSize: '1.5rem',
                    opacity: 0.8
                }}
            >
                {isPlaying ? '🔊' : '🔇'}
            </Button>
        </div>
    );
};

export default AudioPlayer;
