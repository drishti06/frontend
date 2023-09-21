import React, { useState, useRef, useEffect } from 'react';

function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audioRef.current.addEventListener('ended', () => {
            setIsPlaying(false); // When audio ends, set isPlaying to false
        });
        return () => {
            audioRef.current.removeEventListener('ended', () => {
                setIsPlaying(false);
            });
        };
    }, []);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset playback position to the beginning
        } else {
            audioRef.current.play().catch(() => {
                setIsPlaying(false); // Handle play error and set isPlaying to false
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="custom-audio-player">
            <audio ref={audioRef} preload="none" onEnded={() => setIsPlaying(false)}>
                <source src={src} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <button className="play-button" onClick={toggleAudio}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
}

export default AudioPlayer;
