import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {

      const pages = [
        {
          name: 'About',
          link: '/About'
        },
        {
          name: 'Contact',
          link: '/Contact'
        },

        {
          name: 'Github',
          link: '/'
        }
      ]

    
      const [anchorElNav, setAnchorElNav] = React.useState(null);
      const [anchorElUser, setAnchorElUser] = React.useState(null);


      const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      
      

  return (
    <AppBar 
    sx={{p:2}}
    position="static"
    style={{backgroundColor: '#f5f5f5'}}
    
    >
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          <Link  to='/'>
          <img width='150px' src='./openSpeechLogo.png'/>
          </Link>

        </Typography>

        <Typography 
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}
        >
          <Link to='/'>
          <img width='150px' src='./openSpeechLogo.png'/>
          </Link>

        </Typography>
        <Box sx={{ flexGrow: 6, display: { xs: 'none', md: 'flex' } }}>

        </Box>
        <Box sx={{ justifyItems:'right', textAlign: 'right', flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button style={{color: '#0A1B29'}}

              key={page.name}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
               <Link style={{textDecoration: 'none', color: '#0A1B29'}} to={page.link}>{page.name}</Link>
              
            </Button>
          ))}
        </Box>

        
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link style={{textDecoration: 'none', color:'black'}} to={page.link}><Typography textAlign="center">{page.name}</Typography></Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>


      </Toolbar>
    </Container>
  </AppBar>
  )
}
