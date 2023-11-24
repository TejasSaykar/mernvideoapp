import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/Explore'
import SubscriptionOutlinedIcon from '@mui/icons-material/Subscriptions'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibrary'
import HistoryOutlinedIcon from '@mui/icons-material/History'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/UserSlice'


const Container = styled.div`
    flex : 1;
    background-color : ${({ theme }) => theme.bgLighter};
    color : ${({ theme }) => theme.text};
    height : 10%;
    font-weight : 14px;
    position : sticky;
    top: 0;
`

const Wrapper = styled.div`
    padding : 18px 26px;
`

const Logo = styled.div`
    display : flex;
    align-items : center;
    gap : 5px;
    font-weight : bold;
    margin-bottom : 25px;
`

const Img = styled.img`
    height : 25px;
    border-radius : 8px;
`
const Item = styled.div`
    display : flex;
    align-items : center;
    gap: 20px;
    cursor : pointer;
    padding : 7.5px 5px;

    &:hover{
        background-color : ${({ theme }) => theme.soft};
    }
`
const Hr = styled.hr`
    margin : 15px 0px;
    border : 0.5px solid ${({ theme }) => theme.soft};
`
const Login = styled.div``;
const LogoutButton = styled.div`
    display : flex;
    width : 100%;
    justify-content : center;
    flex-direction : column;
    text-align : center;
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
const Title = styled.h2`
    font-size : 14px;
    font-weight : 500;
    color : #aaaaaa;
    margin-bottom : 20px;
`


const Menu = ({ darkMode, setDarkMode }) => {

    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Logo>
                        <Img src='/images/youtube.jpg' />
                        SayTube
                    </Logo>
                </Link>
                <Link to={'/'} style={{ textDecoration: 'none', color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to={"/trending"} style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                <Link to={"/subscriptions"} style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />
                <Item>
                    <VideoLibraryOutlinedIcon />
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                {currentUser ?
                    <>
                        <LogoutButton>
                            Logout from your Account
                            <Button onClick={() => { dispatch(logout()), navigate("/signin") }} style={{ width: "50%", margin: "auto", marginTop: '10px' }}>Logout</Button>
                        </LogoutButton>
                        <Hr />
                    </>
                    :
                    <>
                        <Login>
                            Sign in to like, comment and subscribe.
                            <Link to={'/signin'} style={{ textDecoration: "none" }}>
                                <Button> <AccountCircleOutlinedIcon />SIGN IN</Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>
                }
                <Title>BEST OF SAYTUBE</Title>
                <Item>
                    <LibraryMusicOutlinedIcon />
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlinedIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon />
                    Gamming
                </Item>
                <Item>
                    <MovieCreationOutlinedIcon />
                    Movies
                </Item>
                <Item>
                    <ArticleOutlinedIcon />
                    News
                </Item>
                <Item>
                    <LiveTvOutlinedIcon />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <FlagOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                    {darkMode ? "Light" : "Dark"}Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu
