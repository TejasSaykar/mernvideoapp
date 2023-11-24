import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../components/Comments'
import Card from '../components/Card'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { dislike, fetchSuccess, like } from '../redux/VideoSlice'
import { format } from 'timeago.js'
import { subscription } from '../redux/UserSlice'
import Recommendation from '../components/Recommendation'
// import { fetchChannel, fetchChannelSuccess } from '../redux/ChannelSlice'


const Container = styled.div`
    display: flex;
    gap : 24px;
`
const Content = styled.div`
    flex : 5;
`
const VideoWrapper = styled.div`

`
const Title = styled.h2`
    font-size : 18px;
    font-weight : 400;
    margin-top : 14px;
    margin-bottom : 10px;
    color : ${({ theme }) => theme.text};
`
const Details = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-between;
`
const Info = styled.span`
    color : ${({ theme }) => theme.textSoft};
`
const Buttons = styled.div`
    display : flex;
    gap : 20px;
    color : ${({ theme }) => theme.text};
`
const Button = styled.div`
    cursor : pointer;
    display : flex;
    align-items : center;
    gap: 5px;
`
const Hr = styled.hr`
    border : 0.5px solid ${({ theme }) => theme.soft};
    margin : 15px 0px;
`


const Channel = styled.div`
    display :flex;
    justify-content : space-between;
`
const ChannelInfo = styled.div`
    display : flex;
    gap : 20px;
`

const Image = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;
`

const ChannelDetail = styled.div`
    display : flex;
    flex-direction : column;
    color : ${({ theme }) => theme.text};
`

const ChannelName = styled.span`
    font-weight : bold;
    
`

const ChannelCounter = styled.span`
    margin-top : 5px;
    margin-bottom : 20px;
    color : ${({ theme }) => theme.textSoft};
    font-size : 12px;
`

const Description = styled.p`
    font-size : 14px;
`

const Subscribe = styled.button`
    background-color : #cc1a00;
    font-weight : 500;
    color : white;
    border : none;
    border-radius : 3px;
    height : max-content;
    padding : 10px 20px;
    cursor : pointer;
`

const VideoFrame = styled.video`
    max-height : 720px;
    width : 100%;
    object-fit : cover;
`

const Video = () => {

    // const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({})
    const { id } = useParams();

    const currentUser = useSelector(state => state.user.currentUser);
    const currentVideo = useSelector(state => state.video.currentVideo);
    const dispatch = useDispatch();

    const handleSubscribe = async () => {
        currentUser.subscribedUsers.includes(channel._id) ?
            await axios.put(`/api/v1/users/unsub/${channel._id}`) :
            await axios.put(`/api/v1/users/sub/${channel._id}`);
        dispatch(subscription(channel._id))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/api/v1/video/get/${id}`);
                const channerRes = await axios.get(`/api/v1/users/find/${videoRes.data.video.userId}`);
                setChannel(channerRes.data.user);
                dispatch(fetchSuccess(videoRes.data.video));
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id, dispatch, currentUser]);

    const handleLike = async () => {
        await axios.put(`/api/v1/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id));
    }

    const handleDisLike = async () => {
        await axios.put(`/api/v1/users/dislike/${currentVideo._id}`);
        dispatch(dislike(currentUser._id));
    }



    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={ currentVideo.videoUrl } controls />
                </VideoWrapper>
                <Title>{ currentVideo.title }</Title>
                <Details>
                    <Info>{ currentVideo.views } views . { format(currentVideo.createdAt) }</Info>
                    <Buttons>
                        <Button onClick={ handleLike }>
                            { currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon /> } { currentVideo.likes?.length }
                        </Button>
                        <Button onClick={ handleDisLike }>
                            { currentVideo.dislikes?.includes(currentUser._id) ?
                                <>
                                    <ThumbDownIcon /> Dislike
                                </>
                                :
                                <>
                                    <ThumbDownOffAltOutlinedIcon /> Dislike
                                </>
                            }
                        </Button>
                        <Button><ReplyOutlinedIcon />Share</Button>
                        <Button><AddTaskOutlinedIcon />Save</Button>
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={ channel.img } />
                        <ChannelDetail>
                            <ChannelName>{ channel.name }</ChannelName>
                            <ChannelCounter>{ channel.subscribers } subscribers</ChannelCounter>
                            <Description>{ currentVideo.desc }.</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={ handleSubscribe }>
                        { currentUser.subscribedUsers.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE" }
                    </Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={ currentVideo._id } />
            </Content>
            <Recommendation tags={ currentVideo.tags } />
        </Container>
    )
}

export default Video
