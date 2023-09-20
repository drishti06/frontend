import React, { useEffect, useState } from 'react'
import "./SoundsChart.css"
import axios from 'axios'

function SoundsChart() {
    const [medias, setMedias] = useState([])

    useEffect(() => {
        getAllMedias()
    }, [])

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
            });
    };

    return (
        <div className='soundsChart' >
            <div >
                <button>submit</button>
                <table border={1}>
                    <thead >
                        <tr>
                            <th width="200">Name</th>
                            <th width="100">Author</th>
                            <th width="300">Videos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medias &&
                            medias.map((media) => {
                                return (
                                    <tr>
                                        <th>
                                            <td>{media.name}</td>
                                        </th>
                                        <th>

                                            <td>{media.author}</td>
                                        </th>
                                        <td>
                                            {media.music.map((mus) => {
                                                return (
                                                    <audio controls>
                                                        <source src={`http://localhost:8080${mus}`} />;Your browser does not support audio tag
                                                    </audio>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default SoundsChart