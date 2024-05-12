import logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScreenLoader } from '../app/Loader';
import SnackBarNotification from '../notification/SnackBar';
import { googleAuthProvider, facebookAuthProvider } from '../../firebase/util';
import React, { useState } from 'react';

/**
 * User Authentication Components
 */

/**
 * Authenticates and signs in a user with the selected authentication provider.
 * @returns SignIn component
 */
function SignIn(props) {
    const auth = props.firebaseAuth;

    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState('');

    const signInWithGoogle = () => {
        setIsLoading(true);
        const provider = googleAuthProvider();
        auth.signInWithPopup(provider)
            .catch((error) => {
                console.log(error.code); // github.com/mavu072/legal-companion-webapp/issues/4
                setMessage(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    /* Added Facebook provider. Working but requires App Review */
    const signInWithFacebook = () => {
        setIsLoading(true);
        const provider = facebookAuthProvider();
        auth.signInWithPopup(provider)
            .catch((error) => {
                setMessage(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            {isLoading && <ScreenLoader />}
            {message && <SnackBarNotification message={message}/> }
            <main className='landing-window'>
                <img className="app-logo-banner" src={logo} alt='Logo' />
                <div className='app-content'>
                    <div className='heading'>
                        <span>AI Legal Companion.</span> Empower yourself with the knowledge and confidence to navigate workplace challenges in South Africa.
                    </div>
                    <div className='desc'>
                        AI Legal Companion is your ally in understanding your rights as an employee in South Africa. <span>Get started.</span>
                    </div>
                </div>
                <div className='auth-providers'>
                    <button className='app-btn' onClick={signInWithGoogle}>Sign in with Google <FontAwesomeIcon className='icon google' icon="fa-brands fa-google" /></button>
                    <button className='app-btn' onClick={signInWithFacebook}>Sign in with Facebook <FontAwesomeIcon className='icon facebook' icon="fa-brands fa-square-facebook" /></button>
                </div>
            </main>
            <footer className='landing-footer'>
                <span data-date={new Date().getFullYear()}>Menity</span>
                <div>
                    <a href='#privacy'>Privacy</a>
                    <a href='#terms'>Terms of Service</a>
                </div>
            </footer>
        </>
    );
}

/**
 * Logs out the currently logged in user.
 * @returns SignOut component
 */
function SignOut(props) {
    const auth = props.firebaseAuth;

    const signOut = () => {
        auth.signOut();
    }

    return auth.currentUser && (
        <button className='app-btn' onClick={signOut}>Sign out <FontAwesomeIcon className='icon' icon="fa-solid fa-person-running" /></button>
    );
}

export { SignIn, SignOut }