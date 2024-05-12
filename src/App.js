// App Stylesheet
import './App.css';

// Assets
import logoSymbol from './assets/Logo-symbol.svg';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Components
import ChatWindow from "./components/chat/Chat";
import { SignIn, SignOut } from './components/auth/Auth';
import { ScreenLoader } from './components/app/Loader';

// Firebase React Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase App
import firebaseApp from './firebase/appConfig';

const app = firebaseApp();
const auth = app.auth;
const firestore = app.firestore;

/**
 * Main App component.
 * @returns App component
 */
function App() {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    console.log(error);
  }

  return (
    <>
      {loading ? <ScreenLoader /> : <></>}
      <div className='app'>
        {user ? <AppHeader /> : <></>}
        <section>
          {user ? <ChatWindow firebaseAuth={auth} firestoreDatabase={firestore} /> : <SignIn firebaseAuth={auth} />}
        </section>
      </div>
    </>
  );
}

/**
 * Displays the app header
 * @returns AppHeader component
 */
function AppHeader() {
  return (
    <header className="chat-header">
      <div className="header-title">
        <img className="app-logo" src={logoSymbol} alt='Logo' />
      </div>
      <SignOut firebaseAuth={auth} />
    </header>
  );
}

// Font Awesome Library management
library.add(fas);
library.add(fab);

export default App;