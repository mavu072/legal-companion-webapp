import logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScreenLoader } from '../app/Loader';
import { googleAuthProvider, facebookAuthProvider } from '../../firebase/util';
import React, { useEffect, useState } from 'react';
/**
 * User Authentication Components
 */

/**
 * Authenticates and signs in a user with the selected authentication provider.
 * @returns SignIn component
 */
function SignIn(props) {
    const auth = props.firebaseAuth;

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { setIsLoading(false); }, []);

    const signInWithGoogle = () => {
        setIsLoading(true);
        const provider = googleAuthProvider();
        auth.signInWithPopup(provider)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    /* Added Facebook provider. Working but requires App Review */
    const signInWithFacebook = () => {
        const provider = facebookAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            {isLoading ? <ScreenLoader /> : <></>}
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
                    <button onClick={signInWithGoogle}>Sign in with Google <FontAwesomeIcon className='icon google' icon="fa-brands fa-google" /></button>
                    <button onClick={signInWithFacebook}>Sign in with Facebook <FontAwesomeIcon className='icon facebook' icon="fa-brands fa-square-facebook" /></button>
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
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign out <FontAwesomeIcon className='icon' icon="fa-solid fa-person-running" /></button>
    );
}

export { SignIn, SignOut }