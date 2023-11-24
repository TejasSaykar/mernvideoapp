import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'


const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "280px"};
    margin-bottom : ${(props) => props.type === "sm" ? "10px" : "45px"};
    cursor : pointer;
    display : ${(props) => props.type === "sm" && "flex"};
    gap : 10px;
    padding : 15px 0px;

    &:hover{
        background-color : ${({ theme }) => theme.soft};
        border-radius : 8px;
    }
`
const Image = styled.img`
    width : 100%;
    height : ${(props) => props.type === "sm" ? "120px" : "202px"};
    background-color : #999;
    flex : 1;
`
const Details = styled.div`
    display: flex;
    margin-top : ${(props) => props.type !== "sm" && "10px"};
    gap : 12px;
    flex : 1;
`
const ChannelImage = styled.img`
    height: 30px;
    width : 30px;
    border-radius : 50%;
    background-color : #999;
    display : ${(props) => props.type === "sm" && "none"};
`
const Texts = styled.div``
const Title = styled.h2`
    font-size: 14px;
    font-weight : 500;
    color : ${({ theme }) => theme.text};
`
const ChannelName = styled.h3`
    font-size : 12px;
    color : ${({ theme }) => theme.textSoft};
    margin : 5px 0px;
`
const Info = styled.div`
    font-size : 12px;
    color : ${({ theme }) => theme.textSoft};
`


const Card = ({ type, video }) => {

    const [user, setUser] = useState({});

    const currentUser = useSelector(state => state.user.currentUser);


    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/v1/users/find/${video.userId}`);
            if (data.success) {
                setUser(data.user)
            }
        }
        getUser();
    }, [video.userId])

    return (
        <Link to={ currentUser ? `/video/${video._id}` : "/signin" } style={ { textDecoration: "none", color: "inherit" } }>
            <Container type={ type }>
                <Image type={ type } src={ video.imgUrl } />
                <Details type={ type }>
                    <ChannelImage type={ type } src='/images/registerBg.jpeg' />
                    <Texts>
                        <Title>{ video.title }</Title>
                        <ChannelName>{ user.name }</ChannelName>
                        <Info>{ video.views } views . { format(video.createdAt) }</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card
