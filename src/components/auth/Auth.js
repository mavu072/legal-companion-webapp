import logo from '../../assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TypeAnimation } from 'react-type-animation';
import { ScreenLoader } from '../app/Loader';
import SnackBarNotification from '../notification/SnackBar';
import { googleAuthProvider, facebookAuthProvider } from '../../firebase/util';
import React, { useState } from 'react';
import AppFooter from '../app/Footer';

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
            {message && <SnackBarNotification message={message} />}
            <main className='landing-window'>
                <img className="app-logo-banner" src={logo} alt='Logo' />
                <div className='app-content'>
                    <div className='heading'>
                        <span>AI Legal Companion. </span>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Send your questions and get tailored legal information based on South Africa\'s labour laws.',
                                1000,
                                'Understand complex legal concepts with easy explanations, personalized to your situation.',
                                1000,
                                'Upload legal documents for a quick check against South Africa\'s labour laws.',
                                1000,
                                'Enjoy a seamless experience with our intuitive platform.',
                                1000,
                            ]}
                            speed={50}
                            repeat={Infinity}
                            style={{
                                color: '#000000',
                            }}
                        />
                    </div>
                    <div className='desc'>
                        Our AI-powered platform offers personalized legal insights to empower you in understanding your rights as an employee in South Africa.&nbsp;
                        <span>Join our community today!</span>
                    </div>
                </div>
                <div className='auth-providers'>
                    <button className='app-btn' onClick={signInWithGoogle}>Sign in with Google <FontAwesomeIcon className='icon google' icon="fa-brands fa-google" /></button>
                    <button className='app-btn' onClick={signInWithFacebook}>Sign in with Facebook <FontAwesomeIcon className='icon facebook' icon="fa-brands fa-square-facebook" /></button>
                </div>
                <div className='notice'>
                    <small>
                        By continuing, you agree to our <a className='link' href='/terms'>Terms of Service</a> and acknowlegde our <a className='link' href='/privacy'>Privacy Policy</a>.
                    </small>
                </div>
            </main>
            <AppFooter />
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