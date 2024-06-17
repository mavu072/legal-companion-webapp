import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logoLight from '../assets/Logo-short-light.svg';
import logoDark from '../assets/Logo-short-dark.svg';

import { AppContext } from '../context-provider/Context';
import { googleAuthProvider } from '../../firebase/util';

import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/about">
                Menity
            </Link>{' '}
            {new Date().getFullYear()}
            {'. All Rights Reserved.'}
        </Typography>
    );
}

const appName = 'AI Legal Companion';

const logoStyle = {
    width: '50px',
    height: 'auto',
    cursor: 'pointer',
};

function SignIn() {
    const { auth, user, mode } = React.useContext(AppContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) navigate('/home');
    }, [auth, user, navigate]);

    const defaultTheme = createTheme({ palette: { mode } });

    const [buttonText, setButtonText] = React.useState("Sign In");
    const [accountAction, setAccountAction] = React.useState("Don't have an account? Sign Up");
    const [email, setEmail] = React.useState(null);

    const toggleAccountAction = () => {
        setButtonText((prev) => (prev === "Sign Up" ? "Sign In" : "Sign Up"));
        setAccountAction((prev) =>
            (prev === "Already have an account? Sign In" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"));
    }

    const handleSignInWithEmailAndPassword = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        const email = data.get('email');
        const password = data.get('password');

        if (buttonText === "Sign In") {
            auth.signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log(error.code, error.message); // github.com/mavu072/legal-companion-webapp/issues/4
                })
                .finally(() => {
                    console.log('User authenticated:', auth);
                });
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log(error.code, error.message); // github.com/mavu072/legal-companion-webapp/issues/4
                })
                .finally(() => {
                    console.log('User created:', auth);
                });
        }
    };

    const handleSignInWithGoogle = () => {
        const provider = googleAuthProvider();
        auth.signInWithPopup(provider)
            .catch((error) => {
                console.log(error.code, error.message); // github.com/mavu072/legal-companion-webapp/issues/4
            })
            .finally(() => {
                console.log('User successfully logged in.', auth);
            });
    }

    const handlePasswordResetRequest = () => {
        if (!email) console.log('Invalid email.');
        else {
            auth.sendPasswordResetEmail(email)
                .catch((error) => {
                    console.log(error.code, error.message); // github.com/mavu072/legal-companion-webapp/issues/4
                })
                .finally(() => {
                    console.log('Password reset email sent.');
                });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Link href="/" variant="body2">
                        <img
                            src={mode === 'light' ? logoLight : logoDark}
                            style={logoStyle}
                            alt={appName}
                        />
                    </Link>
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{ mt: 2 }}
                    >
                        Sign in to {appName}
                    </Typography>
                    <Button type="button" onClick={handleSignInWithGoogle} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} >
                        Continue with Google
                    </Button>
                    <Typography>
                        or
                    </Typography>
                    <Box component="form" onSubmit={handleSignInWithEmailAndPassword} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {buttonText}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={handlePasswordResetRequest}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={toggleAccountAction}>
                                    {accountAction}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;