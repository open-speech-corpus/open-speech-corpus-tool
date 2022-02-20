import React from 'react'
import { useEffect, useState } from "react";
import {db,storage} from '../Providers/firebase'
import HeaderComponent from '../Components/HeaderComponent';
import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';  
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FooterComponent from '../Components/FooterComponent';

export default function ListenScreen() {

  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [defaultRating, setDefaultRating] = useState(2)
  const [randomWord, setRandomWord] = useState(null);
  const [isSubmitAndNext, setIsSubmitAndNext] = useState(true)
  const [randomWordDocumentID, setIsRandomWordDocumentID] = useState(null)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    LoadAudio();
  } , [])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function LoadAudio() {
      
    db.collection('audiometadata').onSnapshot(snapshot => {      
      let randomID = Math.floor(Math.random() * snapshot.docs.length)
      let randomWord = snapshot.docs[randomID].data()
      let randomWordDocumentID = snapshot.docs[randomID].id
      
      setRandomWord(randomWord)
      setIsRandomWordDocumentID(randomWordDocumentID)
      setIsLoading(false)

    })     
  }
  
  const PlayAudio = () => {
    let audio = document.getElementById('wordAudio')
    audio.play()
    setIsPlaying(true)
  }

  const StopAudio = () => {
    let audio = document.getElementById('wordAudio')
    audio.pause()
    setIsPlaying(false)
  }

  const ratingChanged = (newRating) => {
    setDefaultRating(newRating)
    setIsSubmitAndNext(false)
  }

  async function SubmitRating() {

    try{
        db.collection('audioRatings').add({
          word: randomWord.word,
          docID: randomWordDocumentID,  
          rating: defaultRating
      })

      setOpen(true)
      await LoadNextWord()

    }catch(error){
      console.log(error)
    }

  }


  async function LoadNextWord(){
    setIsLoading(true)
    setIsPlaying(false)
    setDefaultRating(2)
    setRandomWord(null)
    setIsSubmitAndNext(false)
    await LoadAudio()
  }

return (
    <>

    <HeaderComponent />
  
     {/* Recording Container  */}
     <Container >
        <Container
          maxWidth="sm"
          sx={{mt:10,}}
        >
            <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Thanks for Submitting Your Rating!"
          />

            <Paper sx={{p:6, textAlign: 'center'}} elevation={3}>

              {
                isLoading ? (
                    <p>Halaa! Seems we don't have any recordings at this moment.</p>
                ) : (
                  
                  <>
                  <p>Click on Play Audio Button To Listen to Recording.</p>
                  <h1>{randomWord.word}</h1>
                   
                   <audio style={{display: 'none'}} id='wordAudio' controls src={randomWord.url}></audio><br/>

                   {
                     !isPlaying ? (
                       <Button onClick={PlayAudio} variant="outlined" color='error'>Play Audio</Button>
                     ) : (
                      <Button onClick={PlayAudio} variant="outlined" color='error'>Play Audio Again</Button>

                      )
                   }
                   
                   {/* Rating Form Data */}
   
                   <Box sx={{mt:4 , display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                     <p>How much does this word match with the recording?</p>
                       <Stack spacing={2}>
                         <Rating onChange={(e, newValue) => ratingChanged(newValue)} name="size-large" defaultValue={defaultRating} size="large" />
                       </Stack>
                       <Button onClick={SubmitRating} disabled={isSubmitAndNext} variant='outlined' sx={{mt:2}}>Submit and Listen Another</Button>
                   </Box>
                   </>
                )
              }

            </Paper>
        </Container>
     </Container>
     <Box sx={{mt:2}}>
       <FooterComponent />
     </Box>

    </>
  )
}
