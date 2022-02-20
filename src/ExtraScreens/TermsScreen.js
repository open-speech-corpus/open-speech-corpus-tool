import React from 'react'
import Container from '@mui/material/Container'
import HeaderComponent from '../Components/HeaderComponent'
import FooterComponent from '../Components/FooterComponent'
import { Box } from '@mui/system'
export default function TermsScreen() {
  return (
    <>
      <HeaderComponent />

        <Container sx={{mt:10}}>

              <h2 style={{fontWeight:'600', fontSize:'30px'}}>Terms</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra, orci sed iaculis pulvinar, lacus felis maximus purus, eget tristique est libero sit amet nisl. Cras dictum tempor ex porttitor scelerisque. Phasellus blandit id ligula vel facilisis. Vivamus vitae turpis sit amet risus vulputate tempor euismod ut neque. Donec bibendum at velit sed egestas. Aliquam dapibus nulla ex, sed mattis urna eleifend eget. Vestibulum ornare cursus risus, vel pharetra ante viverra non. Cras luctus consequat ante, ut maximus nisi scelerisque vitae. Sed congue aliquet augue vitae dictum. Integer rhoncus ornare cursus. Mauris fringilla eget elit a sodales.</p>
        
        </Container>

        <Box sx={{mt:6}} >
            <FooterComponent />
        </Box>
    </>
  )
}
