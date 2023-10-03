import React, { useEffect, useState } from 'react';
import "./SoundsChart.css";
import axios from 'axios';
import { BsFillPlayFill, BsFillPauseFill,BsDownload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../features/auth/authSlice';


function SoundsChart() {
    const [medias, setMedias] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        getAllMedias();
    }, []);

    const getAllMedias = () => {
        axios
            .get('http://localhost:8080/audio/allMusic')
            .then((result) => {
                setMedias(result.data);
            })
            .catch((error) => {
                setMedias([]);
                console.log(error);
                alert("Error happened!");
            })};
    const playSong = (index) => {
        if (currentSong !== index) {
            if (currentSong !== null) {
                const currentAudio = document.getElementById(`audio-${currentSong}`);
                currentAudio.pause();
                currentAudio.currentTime = 0; 
            }
            setCurrentSong(index);
            document.getElementById(`audio-${index}`).play().catch((err) => {
                console.log(err.msg)
            });
        } else {
            const audioElement = document.getElementById(`audio-${index}`);
            if (audioElement.paused) {
                audioElement.play().catch(() => {
                });
            } else {
                audioElement.pause();
            }
            setCurrentSong(audioElement.paused ? null : index);
        }
    };

    const isPlaying = (index) => {
        const audioElement = document.getElementById(`audio-${index}`);
        return currentSong === index && !audioElement.paused;
    };

    const handleDownload = async (media) => {
        try {
            const response = await fetch(`http://localhost:8080${media.music}`);
            if (response.status === 200) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${media.name}.mp3`;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.log('File not found.');
            }
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    return (
        <div className='soundsChartsParent'>

        <div className='soundsChart'>
            <div className='chart-head'>
                <span>Name</span>
                <span>Contents</span>
            </div>
            <div>
                {medias &&
                    medias.map((media, index) => {
                        const backgroundColor = index % 2 === 0 ? 'rgb(200, 200, 200)' : '#E9E9E9';
                        return (
                            <div className='chart-contents' style={{ backgroundColor: backgroundColor }} key={index}>
                               
                                <div className='content-number'>
                                    <span className='number'>{index + 1}</span>
                                </div>
                                <div className='song-name-author'>
                                    <span>{media.name}</span>
                                    <span>{media.author}</span>
                                </div>
                                <div className="content-audio">
                                    <audio id={`audio-${index}`} preload="none">
                                        <source src={`http://localhost:8080${media.music}`} type="audio/mp3" />
                                        Your browser does not support the audio element.

                                    </audio>
                                        {
                                          user &&  user.role==='unsubcribed' ?
                                          
                                          <button className="download-button" onClick={() => handleDownload(media)}>
                                                <BsDownload style={{ fontSize: '20px' }} />
                                            </button>
                                 
                                          : null
                                        }
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
    );
}

export default SoundsChart;
