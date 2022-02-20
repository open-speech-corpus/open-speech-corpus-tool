import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import HeaderComponent from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

export default function Register() {

  const { RegisterUser , currentUser} = useAuth();

  const [error, setError] = React.useState("")

  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  async function handleSubmit (event){
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    if(data.get('password') !== data.get('confirmPassword')){
      return setError('Passwords do not match');
    }
    
    try{
      setError("")
      setLoading(true);
      await RegisterUser(data.get('email'), data.get('password'));

      history.push('/dashboard');

    } catch(error){
      setError('Failed to create an account! Please try again');
      console.log(error);
    }
    
    setLoading(false);

  };

  return (
    <>
    <HeaderComponent/>
      {currentUser && history.push('/')}

        <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Create a new account
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              required
              margin="normal"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Repeat Password"
              type="password"
              id="passwordrepeat"
              autoComplete="current-password"
            />

            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
        
          </Box>
        </Box>
      </Container>
     
     <FooterComponent/>
   
    </>
 
  );
}