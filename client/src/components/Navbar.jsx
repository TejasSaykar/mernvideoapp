import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Upload from './Upload'

const Container = styled.div`
    position : sticky;
    top :0;
    background-color : ${({ theme }) => theme.bgLighter};
    height : 56px;
`
const Wrapper = styled.div`
    display : flex;
    align-items : center;
    height : 100%;
    padding : 0px 20px;
    justify-content : flex-end;
    position : relative;
`
const Search = styled.div`
    width : 30%;
    position : absolute;
    left : 0px;
    right : 0px;
    margin : auto;
    display : flex;
    align-items : center;
    justify-content : space-between;
    padding : 5px;
    border : 1px solid #ccc;
    border-radius : 3px;
`
const Input = styled.input`
    border : none;
    background-color : transparent;
    outline: none;
    color : ${({ theme }) => theme.text};
    width : 100%;
`
const Button = styled.button`
    padding : 5px 15px;
    background-color : transparent;
    border : 1px solid #3ea6ff;
    color : #3ea6ff;
    border-radius : 3px;
    font-weight : 500;
    margin-top : 10px;
    cursor : pointer;
    display : flex;
    align-items : center;
    gap : 5px;
`

const User = styled.div`
    display : flex;
    align-items : center;
    gap : 10px;
    font-weight : 500;
    color : ${({ theme }) => theme.text};
`
const Avatar = styled.img`
    width : 36px;
    height : 36px;
    border-radius : 50%;
    background-color : #999;
`

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' onChange={ (e) => setQ(e.target.value) } />
                        <SearchOutlinedIcon onClick={ () => navigate(`/search?q=${q}`) } />
                    </Search>
                    {
                        currentUser ?
                            <User>
                                <VideoCallOutlinedIcon style={ { cursor: "pointer" } } onClick={ () => setOpen(true) } />
                                <Avatar src={ currentUser.img } />
                                { currentUser.name }
                            </User> :
                            <Button onClick={ () => navigate("/signin") }>
                                <AccountCircleOutlinedIcon /> SIGN IN
                            </Button>
                    }
                </Wrapper>
            </Container>
            { open && <Upload setOpen={ setOpen } /> }
        </>
    )
}

export default Navbar
