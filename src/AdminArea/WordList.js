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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

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

  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
  };

  const [allWords, setAllWords] = React.useState(null)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")
  const [isAdding, setIsAdding] = React.useState(false)

  async function LoadData() {
    db.collection('words').get().then(snapshot => {
        setAllWords(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })));
  })

  }

  React.useEffect(() => {
    LoadData()


  }, []);


async function handleAddWord(e) {
    e.preventDefault();

    const word = e.target.elements.word.value;
    setIsAdding(true)
    try{
        await db.collection('words').add({
            word: word,
        })
        LoadData()
        setSuccess("Word added successfully")
        setIsAdding(false)
        setOpenAdd(false);

    }catch(error){
        setError("Error adding word")
        setIsAdding(false)
        setOpenAdd(false);
    }

  }

  async function deleteWord(id){
      let text = "Are you sure you want to delete this word?";
      if (confirm(text) == true) {
        
        db.collection('words').doc(id).delete().then(() => {
            alert("Word deleted successfully")
            LoadData()
        }).catch(() => {});

      } else {
        text = "You canceled!";
      }
  }

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
              Manage Words
            </Typography>
       
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

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              
              
              <Button sx={{mb:3}} variant="outlined" onClick={handleClickOpen}>
                Add New Word
              </Button>


                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'row',
                    
                  }}
                >

   
                <Dialog
                    component="form"
                    onSubmit={handleAddWord}
                    fullWidth={true}
                    open={openAdd}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Add New Word"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                

                    <p>Enter the word you want to add.</p>
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        name="Enter the Word"
                        label="Enter Word"
                        type="text"
                        id="word"
                        />

                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                    <Button disabled={isAdding} type='submit' variant='contained' >Add Now</Button>
                   

                    </DialogActions>
                  
                  </Dialog>

                  
                  
                  <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                      
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {allWords?.map((row) => (
                            <TableRow key={row.word}>
                            <TableCell>{row.word}</TableCell>
                            <TableCell><Button onClick={()=> deleteWord(row.id)}>Delete</Button></TableCell>

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

export default function WordList() {
  return <DashboardContent />;
}
