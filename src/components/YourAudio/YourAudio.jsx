import React, { useEffect, useState } from 'react'
import "./YourAudio.css"
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../features/auth/authSlice'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import axios from 'axios'

const YourAudio = () => {
    const [yourMusic, setYourMusic] = useState([])
    const [currentSong, setCurrentSong] = useState(null);
    const user = useSelector(selectLoggedInUser)

    useEffect( () => {
        yourAllMusic()
    }, [user.id])

    const yourAllMusic =  () =>{
        axios
        .post(`http://localhost:8080/audio/music/${user.id}`)
        .then((result) => {
            setYourMusic(result.data);
            
        })
        .catch((error) => {
            setYourMusic([]);
            console.log(error);
            alert("Error happened!");
        });
    }
    const playSong = (index) => {
        if (currentSong !== index) {
            // If a different song is clicked, pause the current song if it's playing
            if (currentSong !== null) {
                const currentAudio = document.getElementById(`mus-${currentSong}`);
                currentAudio.pause();
                currentAudio.currentTime = 0; // Reset playback position to the beginning
            }
            setCurrentSong(index);
            document.getElementById(`mus-${index}`).play().catch(() => {
                // Handle play error
            });
        } else {
            // If the same song is clicked again, toggle play/pause
            const audioElement = document.getElementById(`mus-${index}`);
            if (audioElement.paused) {
                audioElement.play().catch(() => {
                    // Handle play error
                });
            } else {
                audioElement.pause();
            }
            // Toggle currentSong if it's the same song
            setCurrentSong(audioElement.paused ? null : index);
        }
    };

    const isPlaying = (index) => {
        const audioElement = document.getElementById(`mus-${index}`);
        return currentSong === index && !audioElement.paused;
    };

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    return (
        <div className='yourSounds'>
            <div>
            <div className='your-chart-head'>
                <span>Name</span>
                <span>Contents</span>
            </div>
            <div>
                {yourMusic &&
                    yourMusic.map((media, index) => {
                        const backgroundColor = index % 2 === 0 ? 'rgb(200, 200, 200)' : '#E9E9E9';
                        return (
                            <div className='your-contents' style={{ backgroundColor: backgroundColor }} key={index}>
                               
                                <div className='audio-number'>
                                    <span className='number'>{index + 1}</span>
                                </div>
                                <div className='author'>
                                    <span>{media.name}</span>
                                    <span>{media.author}</span>
                                </div>
                                <div className="your-audio">
                                    <audio id={`audio-${index}`} preload="none">
                                        <source src={`http://localhost:8080${media.music}`} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                         <div>Time: {formatTime(yourMusic[index].duration)}</div>
                                    </audio>
                                    <button className="play-button" onClick={() => playSong(index)}>
                                    {isPlaying && currentSong === index ? <BsFillPauseFill style={{color:'blue', fontSize:'20px'}} /> : <BsFillPlayFill style={{color:'blue', fontSize:'20px'}} />}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            </div>
        </div>

    )
}

export default YourAudio