import { useEffect, useRef } from 'react';

export const useKeyboardControls = () => {
    const keys = useRef({ forward: false, backward: false, left: false, right: false, drift: false });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key.toLowerCase()) {
                case 'arrowup': case 'w': keys.current.forward = true; break;
                case 'arrowdown': case 's': keys.current.backward = true; break;
                case 'arrowleft': case 'a': keys.current.left = true; break;
                case 'arrowright': case 'd': keys.current.right = true; break;
                case 'shift': keys.current.drift = true; break;
            }
        };

        const handleKeyUp = (e) => {
            switch (e.key.toLowerCase()) {
                case 'arrowup': case 'w': keys.current.forward = false; break;
                case 'arrowdown': case 's': keys.current.backward = false; break;
                case 'arrowleft': case 'a': keys.current.left = false; break;
                case 'arrowright': case 'd': keys.current.right = false; break;
                case 'shift': keys.current.drift = false; break;
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
