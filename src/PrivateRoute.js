import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import {db} from './Providers/firebase';

export default function PrivateRoute({component: Component, ...rest}) {

    const { currentUser } = useAuth();



    return (
      <Route
          {...rest}
          render={props => {
              return currentUser ? <Component {...props} /> : <Redirect to="/login" />
          }}
       ></Route>
  );
}
