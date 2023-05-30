import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage({}, 'auth')

    return (
       <AuthContext.Provider value={[ auth, setAuth ]}>
            {children}
       </AuthContext.Provider>
    );
}

export default AuthContextProvider;
