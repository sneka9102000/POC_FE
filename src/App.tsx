import { BrowserRouter, Link as RouterLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Profile from './Profile';
import SignIn from './SignIn';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <Container maxWidth="xl" sx={{ p: '0px !important' }}>
      <BrowserRouter basename="/react-auth0">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
                {!isAuthenticated &&
                <Button
                  component={RouterLink}
                  to="/signIn"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign In
                </Button>
                }
                {isAuthenticated &&
                <Button
                  component={RouterLink}
                  to="/profile"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Profile
                </Button>
                }
                {isAuthenticated &&
                <Button
                  onClick={() => {
                    logout({ returnTo: window.location.origin + '/react-auth0' });
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign Out
                </Button>
                }
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
