import React from 'react'
import { useEffect, useState } from "react";
import HeaderComponent from '../Components/HeaderComponent'
import Container from '@mui/material/Container'
import Box from '@mui/system/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Alert } from '@mui/material'
import { AlertTitle } from '@mui/material'
import {db,storage} from '../Providers/firebase'
import MicRecorder from 'mic-recorder-to-mp3';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import FooterComponent from '../Components/FooterComponent';

// Initilize the recorder
const Mp3Recorder = new MicRecorder({ 
  bitRate: 64 ,
  prefix: "data:audio/wav;base64,",
});

export default function RecordScreen() {
  // State Declaration
  const [isRecording, setIsRecording] = React.useState(false)
  const [blobURL, setBlobURL] = React.useState(null)
  const [isBlocked, setIsBlocked] = React.useState(false)
  const [hasRecorded, setHasRecorded] = React.useState(false)
  const [recordedData, setRecordedData] = React.useState(null)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [randomWord, setRandomWord] = React.useState(null)
  const [hasRandomWordLoaded, setHasRandomWordLoaded] = React.useState(false)
  const [randomWordDocumentID, setRandomWordDocumentID] = React.useState(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [runInterval, setRunInterval] = React.useState(false)

  async function FetchRandomWord() {
    db.collection('words').onSnapshot(snapshot => {      
      // Set Random Word
      let randomID = Math.floor(Math.random() * snapshot.docs.length)
      let randomWord = snapshot.docs[randomID].data()
      let randomWordDocumentID = snapshot.docs[randomID].id

      setRandomWordDocumentID(randomWordDocumentID)
      setRandomWord(randomWord)
      setHasRandomWordLoaded(true)

    })
  }


useEffect(() => {
    // Get Words List From Database
    FetchRandomWord()
    navigator.getUserMedia({ audio: true },
      () => {
        setIsBlocked(false);
      },
      () => {
        alert('Access to Microphone Is Blocked. Please Allow Access to Microphone in Settings.');
        setIsBlocked(true);
      },
    );

}, [])


// Start Recording Function
const start = () => {
    

    if (isBlocked) {
      alert('Access to Microphone Is Blocked. Please Allow Access to Microphone in Settings.');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
          startIntervalTask();
        }).catch((e) => console.error(e));
    }
};

// Stop Recording Functin
async function stopFunction ()  {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        const binaryString = btoa(blobURL)
        setBlobURL(blobURL)
        setIsRecording(false)
        const audio = new Audio(blobURL)
        setRecordedData(blob)
        setHasRecorded(true)
      })
      .catch((e) => console.error(e));
  }

// Discard Recording and Nullify all states
const DiscardRecording = () => {
      setIsUploading(false)
      setIsRecording(false)
      setHasRecorded(false)
      setBlobURL(null)
      setRecordedData(null)

}

// Function to Upload Recording to Database
async function UploadToDatabase() {
      setIsUploading(true)
      let blob = recordedData
      const uploadTask = storage.ref(`audios/${randomWord.word}/${new Date().getTime()}`).put(blob)
        
      uploadTask.on('state_changed',
          (snapshot) => {
            // progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setUploadProgress(progress)
          },
          (error) => {
            // error function
           
          },
          () => {
            // complete function
            storage.ref(`audios/${randomWord.word}/`).child(uploadTask.snapshot.ref.name).getDownloadURL().then(url => {  
              db.collection('audiometadata').add({
                url: url,
                wordID: randomWordDocumentID,
                word: randomWord.word, 
              }).then(() => {
                setIsUploading(false)

              })
            })
          }
        )
  }


// Load Next Word Function - 
async function LoadNextWord() {
     setUploadProgress(0)
     DiscardRecording()
     await FetchRandomWord()
}

// Listen to Recording By User
async function ListenRecording() {
    let audio = document.getElementById('PlayAudio')
    audio.play()
}

// Turn off recording after 10 Seconds




return (

    hasRandomWordLoaded ? (
      <>
      <HeaderComponent />
  
      {/* Recording Container With Top margin in center card box */}
      <Container>
          <Container maxWidth="sm" sx={{mt:10,}}>
         
            <Paper sx={{p:6, textAlign: 'center'}} elevation={3}>
                <p>Press Speak Button and then read the word/sentence in bold.</p>
                <h1>{randomWord.word}</h1>
                    {
                      hasRecorded ? (
                        uploadProgress == 100 ? (
                          <>  
                            <Box sx={{textAlign: 'left'}}>
                             
                              <Alert severity="success">
                                <AlertTitle>Thank You.</AlertTitle>
                                    We Recorded the Audio for this word Successfully, Please Click on the Next Button to Load the Next Word.
                               </Alert>
                             
                              <Button onClick={LoadNextWord} sx={{mt:4}} style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins'}}>
                                          Next Word
                              </Button>
                            </Box>
                         
                          </>
                        ) : (
                            <>
                            <Box sx={{textAlign: 'left'}}>
                                 <Alert severity="warning">
                                   <AlertTitle>Your Audio has been recorded.</AlertTitle>
                                    Listen the audio and then press the confrim button to submit your audio.
         
                                    <Box sx={{mt:2, mb:4}}>
                                    
                                        <audio id="PlayAudio" style={{display: 'none'}} src={blobURL} controls />
                                    
                                      <Button onClick={ListenRecording} variant="contained" color='secondary'>Listen Recording</Button>
                                    
                                    </Box>
                                   {
                                      uploadProgress == 0 ? (
                                        <>
                                        <Button sx={{m:1}} onClick={UploadToDatabase} disabled={isUploading} variant='contained'>Confirm and Upload</Button>
                                        <Button sx={{m:1}} onClick={DiscardRecording} disabled={isUploading} variant='outlined' color="error">Record Again</Button>
           
                                        </>
      
                                      ):(
                                        <>
                                         <LinearProgress variant="determinate" value={uploadProgress} />
                                          
                                         <Button onClick={LoadNextWord} sx={{mt:4}} style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins'}}>
                                          Next Word
                                         </Button> 
                                       </>
                                      )
                                   }
                             </Alert>
                            </Box>
                            </>
                        )
                      ) : (
                        !isRecording ? (
                          <>
                         <Button onClick={start} variant='outlined' color='error'  style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins', color: '#dc3545'}}>
                            <KeyboardVoiceIcon/> 
                            Speak Now
                          </Button> <br/>
                            <Button onClick={LoadNextWord} sx={{mt:4}} style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins'}}>
                              Next Word
                            </Button> 
                          </>
                        ) : (
                          <Button onClick={stopFunction} variant='contained' color='error'  style={{fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins', color: '#fff'}}>
                            <KeyboardVoiceIcon/> 
                            Stop Recording
                         </Button> 
                        )
                      )
                    }          
            </Paper>
          </Container>
      </Container>
      <Box sx={{mt:6}} >
       <FooterComponent />
      </Box>

    </>  
    ) :(<><Container maxWidth="sm" sx={{mt:10,}}>
        <Paper sx={{p:6, textAlign: 'center'}} elevation={0}>
          <CircularProgress />
          <p>Loading...</p>
          </Paper>
        
        </Container>
              <Box sx={{mt:6}} >
              <FooterComponent />
             </Box>
            </>
        )
  );
}
