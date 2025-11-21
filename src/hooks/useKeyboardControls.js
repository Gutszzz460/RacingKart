import { useEffect, useRef } from 'react';

export const useKeyboardControls = () => {
    const keys = useRef({ forward: false, backward: false, left: false, right: false, drift: false });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': keys.current.forward = true; break;
                case 'ArrowDown': keys.current.backward = true; break;
                case 'ArrowLeft': keys.current.left = true; break;
                case 'ArrowRight': keys.current.right = true; break;
                case 'Shift': keys.current.drift = true; break;
            }
        };

        const handleKeyUp = (e) => {
            switch (e.key) {
                case 'ArrowUp': keys.current.forward = false; break;
                case 'ArrowDown': keys.current.backward = false; break;
                case 'ArrowLeft': keys.current.left = false; break;
                case 'ArrowRight': keys.current.right = false; break;
                case 'Shift': keys.current.drift = false; break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
};
