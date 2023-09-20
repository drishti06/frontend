import React, { useState } from 'react';
import axios from "axios"


function SoundAudioForm() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [mp3File, setMp3File] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData()
        for (let key in mp3File) {
            formData.append('music', mp3File[key])
        }
        formData.append('name', name)
        formData.append('author', author)
        await axios.post('http://localhost:8080/audio/newMusic', formData)
            .then(() => {
                alert("submitted successfully")
            })
            .catch(error => {
                console.log(error)
                alert("error occured")
            })


    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Song Name:</label>
                <input type="text" name='name' onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Author Name:</label>
                <input type="text" name='author' onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div>
                <label>Upload MP3 File:</label>
                <input type="file" accept='.mp3' name='music' multiple="false" onChange={(e) => { setMp3File(e.target.files) }} />
            </div>
            <input value='submit' type="submit" />
        </form>
    );
}

export default SoundAudioForm;
