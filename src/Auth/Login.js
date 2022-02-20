import * as React from 'react';
import { Alert } from '@mui/material';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import { db } from '../Providers/firebase';

export default function SignIn() {

  const { LoginUser , currentUser} = useAuth();

  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();


async function handleSubmit(event){

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const checkQuery = await db.collection('userPermissions').where('email', '==', data.get('email')).where('permission', '==', 'ADMIN').get();

    if(checkQuery.docs.length > 0){
      try{
    
        setError("")
        setLoading(true);
        await LoginUser(data.get('email'), data.get('password'));
        history.push('/dashboard');
      
      } catch{
      
        setError('Failed to Login! Check your email and password');
      
      }
    }else{
      setError('Halaa! Something Went Wrong. Check your email and password');
    }


    setLoading(false);
  };

  return (
      <>
      <HeaderComponent/>
      {currentUser && history.push('/dashboard')}
      <Container sx={{mb:4}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>

            <h2> LOGIN</h2>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField

              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

          </Box>
        </Box>
      </Container>
      <FooterComponent/>
      </>
      
  );
}