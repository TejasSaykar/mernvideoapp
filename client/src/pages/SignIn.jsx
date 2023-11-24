import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { loginFail, loginStart, loginSuccess } from '../redux/UserSlice';
// import { Link } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    height : calc(100vh - 56px);
    color : ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column;
    background-color : ${({ theme }) => theme.bgLighter};
    border : ${({ theme }) => theme.soft};
    padding : 20px 50px;
    gap : 10px;
`
const Title = styled.h2`
    font-size : 24px;
`;
const SubTitle = styled.h3`
    font-size : 20px;
    font-weight : 300;
`;
const Input = styled.input`
    border : 1.5px solid ${({ theme }) => theme.soft};
    border-radius : 3px;
    padding : 10px;
    background-color : transparent;
    width : 100%;
    color : ${({ theme }) => theme.text};
    outline : none;
`;
const Button = styled.button`
    border-radius : 3px;
    border : none;
    padding : 10px 20px;
    font-weight : 500;
    cursor : pointer;
    background-color : ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
    display : flex;
    font-size : 12px;
    margin-top : 10px;
    color : ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
    margin-left : 50px;
    display : flex;
`;
const Link = styled.span`
    margin-left : 30px;
`;


const SignIn = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const { data } = await axios.post("/api/v1/auth/signin", {
                name, password
            });
            if (data.success) {
                console.log(data.others);
                dispatch(loginSuccess(data.others));
                navigate("/")
            } else {
                console.log("Wrong credentials")
            }
        } catch (error) {
            console.log(error);
            dispatch(loginFail())
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/auth/signup", { name, email, password });
            if (data.success) {
                console.log("SignUp success")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
            axios.post("/api/v1/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }).then((res) => {
                dispatch(loginSuccess(res.data.user))
            })
        }).catch((err) => dispatch(loginFail()));
    }


    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to SayTube</SubTitle>
                <Input type='text' placeholder='username' onChange={(e) => setName(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>SignIn with Google</Button>
                <Title>or</Title>
                <Input type='text' placeholder='username' onChange={(e) => setName(e.target.value)} />
                <Input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignUp}>Sign Up</Button>
            </Wrapper>
            <More>
                English (IND)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn
