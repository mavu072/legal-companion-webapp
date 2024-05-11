// App Stylesheet
import './App.css';

// Assets
import logoIcn from './Logo-icn.svg';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Components
import ChatWindow from "./components/ChatComponents";
import { SignIn, SignOut } from './components/AuthComponents';

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
  const [user] = useAuthState(auth);
  return (
    <div className='app'>
      {user ? <AppHeader /> : <></>}
      <section>
        {user ? <ChatWindow firebaseAuth={auth} firestoreDatabase={firestore} /> : <SignIn firebaseAuth={auth} />}
      </section>
    </div>
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
        <img className="app-logo" src={logoIcn} alt='Logo' />
      </div>
      <SignOut firebaseAuth={auth} />
    </header>
  );
}

// Font Awesome Library management
library.add(fas);
library.add(fab);

export default App;