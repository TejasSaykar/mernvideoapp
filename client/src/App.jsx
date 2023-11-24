import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/theme';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import Search from './pages/Search';


const Container = styled.div`
  display : flex;
`;

const Main = styled.div`
  flex : 7;
  background-color : ${({ theme }) => theme.bg};
  color : ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  padding : 22px 96px;
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
      <Container>
        <Menu darkMode={ darkMode } setDarkMode={ setDarkMode } />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path='/'>
                <Route index element={ <Home type="random" /> } />
                <Route path='search' element={ <Search /> } />
                <Route path='trending' element={ <Home type="trending" /> } />
                <Route path="subscriptions" element={ <Home type="subVideo" /> } />
                <Route path='signin' element={ <SignIn /> } />
                <Route path='/video'>
                  <Route path=':id' element={ <Video /> } />
                </Route>
                {/* <Route path='/video/:id' element={<Video />} /> */ }
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  )
}

export default App
