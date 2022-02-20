import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'
import { auth } from '../Providers/firebase';
import {db} from '../Providers/firebase';


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function RegisterUser(email, password){
        
        await db.collection('userPermissions').add({
            email: email,
            permission: 'user'
        })

        return auth.createUserWithEmailAndPassword(email, password);
    }

    function LoginUser(email, password){
        
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);

        });
    
        return unsubscribe;
      }, []);


    const value = {
        RegisterUser,
        currentUser,
        LoginUser,
        logout,
        resetPassword,
    };

    return (
      <AuthContext.Provider value={value}>
          {!loading && children}
      </AuthContext.Provider>
  )
}



