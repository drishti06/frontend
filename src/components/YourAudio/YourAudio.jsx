import React, { useEffect } from 'react'
import "./YourAudio"
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../features/auth/authSlice'
import axios from 'axios'

const YourAudio = () => {
    const user = useSelector(selectLoggedInUser)
    console.log({ user })

    useEffect(async () => {
        try {
            const response = await axios.post(`http://localhost:8080/audio/myaudios${user.id}`)
            if (response.status === 200) {
                console.log(response)
            }
            else {
                console.log("error in fetching data")
            }
        } catch (error) {
            console.log({ errorinfetchingYourAudios: error.message })
        }

    }, [])
    return (
        <div>

        </div>
    )
}

export default YourAudio