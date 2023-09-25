import React, { useRef, useState } from 'react';
import "./SoundAudioForm.css"
import axios from "axios"
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../../features/auth/authSlice';
import { useNavigate } from "react-router-dom";
import { LiaFileAudio } from "react-icons/lia"




const SoundAudioForm = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [mp3File, setMp3File] = useState([]);
    const [imgFile, setImgFile] = useState([]);
    const user = useSelector(selectLoggedInUser)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData()
        for (let key in mp3File) {
            formData.append('music', mp3File[key])
        }
        for (let key in imgFile) {
            formData.append('thumbnail', imgFile[key])
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

    const handleImage = (e) => {
        const selectImage = e.target.files[0];
        setImgFile([selectImage])
    }

    return (
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
                    <input type="file" accept='.mp3' name='music' multiple="false" onChange={handleMusic} />

                </div>
                <div className='formField'>
                    <label>Upload Image file:</label>
                    {/* <LiaFileAudio onClick={handleFileClick} claName='audioIcon' style={{ color: "white", fontSize: "20px" }} /> */}
                    <input type="file" accept='.jpg' name='thumbnail' multiple="false" onChange={handleImage} />

                </div>
                <div className='formFields'>
                    <input value='submit' type="submit" />
                </div>
            </div>
        </form>
    );
}

export default SoundAudioForm;
