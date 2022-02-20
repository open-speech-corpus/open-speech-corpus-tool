import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'react-router-dom/Link';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link style={{textDecoration: 'none'}} to='/Dashboard'><ListItemText  primary="Dashboard" /></Link> 
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link style={{textDecoration: 'none'}} to='/AllRecordings'><ListItemText  primary="All Recordings" /></Link> 
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link style={{textDecoration: 'none'}} to='/Words'><ListItemText  primary="Words" /></Link> 
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Others
    </ListSubheader>

    <ListItemButton >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <Link style={{textDecoration: 'none'}} to='/Logout'><ListItemText  primary="Logout" /></Link> 

     
    </ListItemButton>
  </React.Fragment>
);
