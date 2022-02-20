import React from 'react'
import HeaderComponent from '../Components/HeaderComponent'
import FooterComponent from '../Components/FooterComponent'
import { Container } from '@mui/material'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Link from 'react-router-dom/Link';
import { Box } from '@mui/system'
export default function HomeScreen() {
  return (
    <>
    <HeaderComponent />
          {/* Speaking Container */}
            <Container maxWidth="fluid" style={{backgroundColor:"#E5E5E5", height:'50vh'}} sx={{ p:4,display: 'flex' , flexDirection: {xl: 'row', lg: 'row', md: 'column', xs: 'column', sm: 'column'}}}>
              
                  <Container sx={{textAlign:'center', mt:6}}>
                      <Typography style={{fontSize: '40px', fontFamily: 'Poppins', fontWeight: '500'}}>
                            Help By
                      </Typography>
                      <Typography style={{fontSize: '44px', fontWeight: '700', fontFamily: 'Poppins'}}>
                            Speaking
                      </Typography>
                  </Container>
              
                  <Container sx={{textAlign:'center', mt:6}} >
                        <p style={{fontSize: '16px', fontWeight: '400', fontFamily: 'Poppins'}}>
                          Start speaking sentences on screen, <br/>this helps us train our model better.
                        </p>

                      <Link to='/Record' style={{textDecoration: 'none'}}>                    
                        <Button variant='outlined' color='error'  style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins', color: '#dc3545'}}>
                          <KeyboardVoiceIcon/> 
                          Start Recording
                        </Button>
                      </Link> 
                  </Container>

            </Container>
      {/* Speaking Container Ends*/}

      {/* Listening Container Starts */}
        <Container maxWidth="fluid" style={{backgroundColor:"#E5E5E5",height:'50vh'}} sx={{ p:4,display: 'flex' , flexDirection: {xl: 'row', lg: 'row', md: 'column', xs: 'column', sm: 'column'}}}>
              
                  <Container sx={{textAlign:'center'}}>
                      <Typography style={{fontSize: '40px', fontFamily: 'Poppins', fontWeight: '500'}}>
                            Help By
                      </Typography>
                      
                      <Typography style={{fontSize: '44px', fontWeight: '700', fontFamily: 'Poppins'}}>
                            Listening
                      </Typography>
                  </Container>

                  <Container sx={{textAlign:'center'}} >
                        <p style={{fontSize: '16px', fontWeight: '400', fontFamily: 'Poppins'}}>
                              Listen to audios recorded by <br/>people and help us in validating them.
                        </p>

                        <Link to='/Listen' style={{textDecoration: 'none'}}>
                            <Button variant='outlined' color='primary' style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins', color: '#0d6efd'}}>
                              <VolumeUpIcon/> 
                              Listen Recording
                            </Button>
                        </Link>
                  </Container>

        </Container>

             <FooterComponent />
       
    </>
  )
}
