import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function Profile() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');
  const BASE_URL = 'http://localhost:3001';

  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = await getAccessTokenSilently(
          // {
          //   audience: 'http://localhost:3001/api/profile', 
          // }
        );      
         console.log("access",accessToken)
        setToken(accessToken);
        console.log("accesstoken",token)

        const response = await axios.get(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            email: user?.email,
            nickname: user?.nickname
          }
        });

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <main style={{ padding: '1rem 0' }}>
      {isAuthenticated && (
        <Grid container justifyContent="center">
          <Grid item sx={{ m: 1 }}>
            <Avatar alt={user?.email} src={user?.picture} sx={{ width: 75, height: 75 }} />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="email" label="Email" value={user?.email} variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="nickname" label="Name" value={user?.nickname} variant="outlined" fullWidth />
          </Grid>
        </Grid>
      )}
    </main>
  );
}

export default Profile;
