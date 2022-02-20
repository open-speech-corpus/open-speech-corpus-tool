import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { db } from '../Providers/firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Open Speech Corpus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {

    setOpen(!open);

  };


  const [AllRecordings, SetAllRecordings] = React.useState([]);
  const [Ratings, setRatings] = React.useState([]);

  
  async function LoadAllRecordings(){
    
    db.collection('audiometadata').get().then(snapshot => {
      SetAllRecordings(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      })));
    })
  }

  async function LoadAllRatings(){
    db.collection('audioRatings').get().then(snapshot => {
      setRatings(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      })));
    })
  }

  async function deleteRecording(id){
    
    let text = "Are you sure you want to delete this Recording?";
    if (confirm(text) == true) {
      
      db.collection('audiometadata').doc(id).delete();
      LoadAllRecordings();
      alert("Recording deleted");

    } else {
      text = "You canceled!";
    }
  }


  // Filter all 4 ratings by document id
   function GetRatingsOfDocument(id, number){
    
    var ratings = Ratings.filter(function(rating){
      return rating.docID === id;
    });

    var numberRating =  ratings.filter(function(rating){
      return rating.rating === number;
    });


    return numberRating.length;

  }
 
  React.useEffect(() => {
    LoadAllRecordings();
    LoadAllRatings();

  }, []);


  return (
    <ThemeProvider theme={mdTheme}>
  

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Manage Recordings
            </Typography>
            <IconButton color="inherit">
            
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid >
              {/* Chart */}
          
              {/* Recent Deposits */}
              <Grid item xs={12} md={12} lg={12}>

             
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'row',
                    
                  }}
                >
                
                
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Word</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>1</TableCell>

                        <TableCell>Audio</TableCell>
                        <TableCell>Actions</TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {AllRecordings?.map((row) => (
                            <TableRow key={row.word}>
                              
                              <TableCell>{row.word}</TableCell>
                              <TableCell>{GetRatingsOfDocument(row.id, 5)}</TableCell>
                              <TableCell>{GetRatingsOfDocument(row.id, 4)}</TableCell>
                              <TableCell>{GetRatingsOfDocument(row.id, 3)}</TableCell>
                              <TableCell>{GetRatingsOfDocument(row.id, 2)}</TableCell>
                              <TableCell>{GetRatingsOfDocument(row.id, 1)}</TableCell>


                            <TableCell>
                              <audio src={row.url} controls />
                            </TableCell>

                            <TableCell>
                               <Button onClick={() => deleteRecording(row.id)} variant='outlined' color='error' >Delete</Button>
                              </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
          
                  
                  
                
          
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AllRecordings() {
  return <DashboardContent />;
}
