import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase App
import firebaseApp from '../../firebase/appConfig';

const app = firebaseApp();
const auth = app.auth;
const firestore = app.firestore;

export const AppContext = createContext();

const getThemePreference = () => {
    const storedPreference = localStorage.getItem('mode');
    return storedPreference ? storedPreference : 'light';
}

const AppProvider = ({ children }) => {
    const [user] = useAuthState(auth);
    const [mode, setMode] = React.useState(getThemePreference());

    React.useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const toggleColorMode = React.useCallback(() => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, [setMode]);

    const value = { auth, firestore, user, mode, toggleColorMode };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;