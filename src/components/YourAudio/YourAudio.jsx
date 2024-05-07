import React, { useEffect, useState } from "react";
import "./YourAudio.css";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../features/auth/authSlice";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const YourAudio = () => {
  const [yourMusic, setYourMusic] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    songName: "",
    author: "",
    id: null,
  });

  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    yourAllMusic();
  }, [user.id]);

  const yourAllMusic = () => {
    axios
      .post(`import.meta.env.VITE_BASEURL/audio/music/${user.id}`)
      .then((result) => {
        setYourMusic(result.data);
      })
      .catch((error) => {
        setYourMusic([]);
        console.log(error);
        alert("Error happened!");
      });
  };
  const playSong = (index) => {
    if (currentSong !== index) {
      if (currentSong !== null) {
        const currentAudio = document.getElementById(`mus-${currentSong}`);
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setCurrentSong(index);
      document
        .getElementById(`mus-${index}`)
        .play()
        .catch((error) => {
          consolelog(error.msg);
        });
    } else {
      const audioElement = document.getElementById(`mus-${index}`);
      if (audioElement.paused) {
        audioElement.play().catch((err) => {
          console.log(err.msg);
        });
      } else {
        audioElement.pause();
      }
      setCurrentSong(audioElement.paused ? null : index);
    }
  };

  const isPlaying = (index) => {
    const audioElement = document.getElementById(`mus-${index}`);
    return currentSong === index && !audioElement.paused;
  };

  const handleEdit = (index) => {
    const selectedMusic = yourMusic[index];
    setEditData({
      songName: selectedMusic.name,
      author: selectedMusic.author,
      id: selectedMusic._id,
    });
    setEditModalVisible(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await axios.patch(
        `import.meta.env.VITE_BASEURL/audio/editMusic/${editData.id}`,
        {
          name: editData.songName,
          author: editData.author,
        }
      );
      if (response.status === 200) {
        alert("Edited!");
        setEditModalVisible(false);
        yourAllMusic(); // Refresh the list after editing
      }
    } catch (error) {
      console.error(error);
      alert("Error editing music");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const deleteSong = async (musicId) => {
    try {
      await axios.delete(
        `import.meta.env.VITE_BASEURL/audio/deleteMusic/${musicId}`
      );
      alert("Deleted successfully");
      yourAllMusic();
    } catch (error) {
      console.error(error);
      alert("Error deleting music");
    }
  };

  return (
    <>
      <div className="yourSounds">
        <div>
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              paddingBottom: "1rem",
            }}
          >
            List of your songs/sounds
          </span>
          <div className="your-chart-head">
            <span>Name</span>
            <span>Contents</span>
          </div>
          <div>
            {yourMusic &&
              yourMusic.map((media, index) => {
                const backgroundColor =
                  index % 2 === 0 ? "rgb(200, 200, 200)" : "#E9E9E9";
                return (
                  <div
                    className="your-contents"
                    style={{ backgroundColor: backgroundColor }}
                    key={index}
                  >
                    <div className="audio-number">
                      <span className="number">{index + 1}</span>
                    </div>
                    <div className="author">
                      <span>{media.name}</span>
                      <span>{media.author}</span>
                    </div>
                    <div className="your-audio">
                      <audio id={`mus-${index}`} preload="none">
                        <source
                          src={`import.meta.env.VITE_BASEURL${media.music}`}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                      <div className="your-sounds-btns">
                        <button
                          className="play-button"
                          onClick={() => playSong(index)}
                        >
                          {isPlaying && currentSong === index ? (
                            <BsFillPauseFill
                              style={{ color: "blue", fontSize: "20px" }}
                            />
                          ) : (
                            <BsFillPlayFill
                              style={{ color: "blue", fontSize: "20px" }}
                            />
                          )}
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(index)}
                        >
                          <MdModeEditOutline
                            style={{ color: "green", fontSize: "20px" }}
                          />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteSong(media._id)}
                        >
                          <MdDelete
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {editModalVisible && (
              <div className="edit-modal">
                <h2>Edit Song</h2>
                <label htmlFor="songName">Song Name</label>
                <input
                  type="text"
                  id="songName"
                  name="songName"
                  value={editData.songName}
                  onChange={handleEditInputChange}
                />
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={editData.author}
                  onChange={handleEditInputChange}
                />
                <button onClick={handleSubmitEdit}>Save</button>
                <button onClick={() => setEditModalVisible(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourAudio;
