import React from 'react'
import Container from '@mui/material/Container'
import HeaderComponent from '../Components/HeaderComponent'
import FooterComponent from '../Components/FooterComponent'
import { Box } from '@mui/system'
export default function AboutScreen() {
  return (
    <>
      <HeaderComponent />

          <Container sx={{mt:10}}>

                <h2 style={{fontWeight:'600', fontSize:'30px'}}>What is Open Voice Corpus</h2>

                <p>

                  Open Voice Corpus is a voice sample collection and validation tool that 
                  helps researchers and engineers to collect and validate voice samples through Crowdsourcing.
                  The Tool can be easily used by anyone who wants to collect voice samples, the developer
                  needs to fork the repository and change the settings to your needs.
                  <br/>
                </p>
          
          </Container>

          <Container sx={{mt:10}}>

               <h2 style={{fontWeight:'600', fontSize:'30px'}}>Credits</h2>

                <p>The tool is part of project submitted at Department of Computer Science and Engineering, Baba Ghulam Shah Badshah University, J&K</p>
                  <ul>
                        <li>Ms. Rukhsana Thaker - Lecturer</li>
                        <li>Syed Vikas Shabir - Student</li>
                        <li>Safoora Mir - Student</li>
                        <li>Umar Ayoub - Student</li>
                        <li>Owais Bin Amin - Student</li>
                  </ul>

          </Container>
    
      <Box sx={{mt:6}} >
       <FooterComponent />
     </Box>
    </>
  )
}
