import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Logout() {

  const { logout} = useAuth();

  const history = useHistory();
  
  async function handleLogout(){

    try{
      await logout()
      history.push('/');
      window.location.reload();
    }catch{
      console.log('Logout Failed');
    }
  
  }
  
  return (handleLogout());


}
