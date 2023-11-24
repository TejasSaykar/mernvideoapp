import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components"


const Container = styled.div`
    flex : 2;
`

const Recommendation = ({ tags }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data } = await axios.get(`/api/v1/video/tags?tags=${tags}`);
            setVideos(data.videos);
        }
        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {
                videos.map((video) => (
                    <Card key={ video._id } video={ video } type="sm" />
                ))
            }
        </Container>
    )
}

export default Recommendation
