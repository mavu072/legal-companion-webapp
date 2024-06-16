import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase App
import firebaseApp from '../../firebase/appConfig';

const app = firebaseApp();
const auth = app.auth;
const firestore = app.firestore;

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user] = useAuthState(auth);
    const [mode, setMode] = React.useState('light');

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = { auth, firestore, user, mode, toggleColorMode };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;