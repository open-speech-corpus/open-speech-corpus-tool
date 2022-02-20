import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Container sx={{p:2}}>
        <h4>{props.countTitle}</h4>
        <Typography component="p" variant="h4">
          {props.count}
        </Typography>
  
        <div>
        
        </div>
      </Container>

    </React.Fragment>
  );
}
