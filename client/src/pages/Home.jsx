import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'



const Container = styled.div`
    display : flex;
    justify-content : space-between;
    flex-wrap : wrap;
`

const Home = ({ type }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            const { data } = await axios.get(`api/v1/video/${type}`);
            if (data.success) {
                setVideos(data.videos)
                console.log(data)
            } else {
                console.log(data.success)
            }
        }
        fetchVideo();
    }, [type])

    return (
        <Container>
            {
                videos?.map((video) => (
                    <Card key={ video._id } video={ video } />
                ))
            }

        </Container>
    )
}

export default Home
