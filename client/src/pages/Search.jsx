import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 10px;
`

const Search = () => {

    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const { data } = await axios.get(`/api/v1/video/search${query}`);
            setVideos(data.videos)
        }
        fetchVideos();
    }, [query]);
    console.log(videos)

    return (
        <div style={ { overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", margin: '10px', padding: "10px" } }>
            {
                videos.map((video) => {
                    return (
                        <>
                            <div key={ video._id } style={ { margin: '10px', flexGrow: 1 } }>
                                <video src={ video.videoUrl } controls alt="" />
                                <p>{ video.title }</p>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Search
