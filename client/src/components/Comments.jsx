import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`

`
const NewComment = styled.div`
    display : flex;
    align-items : center;
    gap : 10px;
`

const Avatar = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;
`

const Input = styled.input`
    border : none;
    border-radius : 12px;
    padding : 6px;
    border-bottom : 1px solid ${({ theme }) => theme.soft};
    background-color : ${({ theme }) => theme.soft};
    outline : none;
    width : 100%;
    color : ${({ theme }) => theme.text};
`

const Button = styled.button`
    background-color : #3ea6ff;

`


const Comments = ({ videoId }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);


    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/comment/add-comment/${videoId}`, { desc: comment });
            if (data.success) {
                console.log("Comment post successfully")
                setComment('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`/api/v1/comment/get/${videoId}`);
                if (data.success) {
                    setComments(data.comments);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchComments();
    }, [videoId, comment])



    return (
        <Container>
            <NewComment>
                <Avatar src={ currentUser.img } />
                <Input placeholder='Add a comment...' value={ comment } onChange={ (e) => setComment(e.target.value) } />
                <Button style={ { padding: "10px 8px", borderRadius: "12px", border: "none", cursor: "pointer" } } onClick={ handleComment } disabled={ comment === '' }>Comment</Button>
            </NewComment>
            {
                comments?.map((comment) => (
                    <Comment key={ comment._id } comment={ comment } />
                ))
            }
        </Container>
    )
}

export default Comments