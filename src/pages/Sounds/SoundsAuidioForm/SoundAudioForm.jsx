import React, { useState } from 'react';
import "./SoundAudioForm.css"
import axios from "axios"
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../../features/auth/authSlice';
import { Link, Navigate} from "react-router-dom";


const SoundAudioForm = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [mp3File, setMp3File] = useState([])
    const user = useSelector(selectLoggedInUser)
    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData()
        for (let key in mp3File) {
            formData.append('music', mp3File[key])
        }

        formData.append('name', name)
        formData.append('author', author)
        formData.append('user', user.id)
        await axios.post('http://localhost:8080/audio/create', formData)
            .then(() => {
                alert("submitted successfully")
            })
            .catch(error => {
                console.log(error)
                alert("error occured")
            })
    };
    const handleMusic = (e) => {
        const selectedFile = e.target.files[0]; // Get the first selected file
        setMp3File([selectedFile]);

    };

    return (
        <>
    {user===null && <Navigate to = "/loinPage" > </Navigate> }
    <form className='audioForm' onSubmit={handleSubmit}>
        <div>
            <h1 className='addAudio'>Add your Audio</h1>
            <div className='formFields'>
                <label>Song Name:</label>
                <input type="text" name='name' onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='formFields'>
                <label>Author Name:</label>
                <input type="text" name='author' onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div className='formField'>
                <label>Upload MP3 File:</label>
                {/* <LiaFileAudioclassName='audioIcon' style={{ color: "white", fontSize: "20px" }} /> */}
                <input type="file" accept='.mp3' name='music'onChange={handleMusic} />

            </div>
            
            <div className='formFields'>
                <input value='submit' type="submit" />
            </div>
        </div>
    </form>
        </>
    );
}

export default SoundAudioForm;
