import './App.css';
import logo from './Logo.svg';
import logoIcn from './Logo-icn.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { formatTime } from './util'
// React
import React, { useState, useRef, useEffect } from 'react';
// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Firebase React Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const LEGAL_COMPANION_API_URL = "http://0.0.0.0:8000";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='app'>
      {user ? <AppHeader /> : <></> }
      <section>
        {user ? <ChatWindow /> : <SignIn />}
      </section>
    </div>
  );
}

function AppHeader() {
  return (
    <header className="chat-header">
        <div className="header-title">
          <img className="app-logo" src={logoIcn} alt='Logo' />
        </div>
        <SignOut />
    </header>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  /* Added Facebook provider. Working but requires App Review */
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <main className='signin-window'>
      <img className="app-logo-banner" src={logo} alt='Logo' />
      <div className='auth-providers'>
        <button onClick={signInWithGoogle}>Sign in with Google <FontAwesomeIcon className='icon google' icon="fa-brands fa-google" /></button>
        <button onClick={signInWithFacebook}>Sign in with Facebook <FontAwesomeIcon className='icon facebook' icon="fa-brands fa-square-facebook" /></button>
      </div>
    </main>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out <FontAwesomeIcon className='icon' icon="fa-solid fa-person-running" /></button>
  );
}

function ChatWindow() {
  const messagesRef = firestore.collection(`users/${auth.currentUser.uid}/messages`); // User private messages collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollection(query);

  const [formValue, setFormValue] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // When a new message is added. It will scroll into view
  useEffect(() => { scrollToBottom(); }, [messages]);

  // When a new line is added on input area the textarea is resize automatically
  const resizeTextarea = (event) => {
    const textarea = document.querySelector('.chat-input');
    const minHeight = 50;
    textarea.style.height = `${minHeight}px`;
    let scrollHeight = event.target.scrollHeight;
    if (scrollHeight > minHeight) {
      textarea.style.height = `${scrollHeight}px`;
    }
  }

  const getServerTimestamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    // Clear form - state will only take place on the next render
    setFormValue('');
    // Get current user
    const { uid } = auth.currentUser;
    // Save new message doc
    await messagesRef.add({
      content: formValue,
      createdAt: getServerTimestamp(),
      role: "user",
      userId: uid,
    });
    // Create and save AI reply to message
    await replyToMessage(formValue, uid);
  }

  const replyToMessage = async (userMsg, userId) => {
    const apiEndpoint = `${LEGAL_COMPANION_API_URL}/assistant/ask/`;
    const reqPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text : userMsg })
    };

    await fetch(apiEndpoint, reqPayload)
          .then(async (response) => {
            if (response.ok) {
              const responseJson = await response.json();
              // Handle response
              let assistantResponse;
              if (responseJson.error) {
                // Handle error response
                assistantResponse = responseJson.error;
              } else {
                // Handle valid response
                assistantResponse = responseJson.response;
              }
              // Create firestore document
              const newDoc = {
                content: assistantResponse,
                createdAt: getServerTimestamp(),
                role: "assistant",
                userId: userId
              }
              // Handle sources
              if (responseJson.sources) {
                const responseSources = new Map();
                responseJson.sources.forEach((item, index) => {
                  responseSources.set(`source ${index + 1}`, item[0]);
                });
                newDoc.sources = Object.fromEntries(responseSources)
              }
              // Save new document
              await messagesRef.add(newDoc);
            }
          })
          .catch((error) => {
            console.log(error);
            // Handle error - Add Popup message
          });
  }

  return (
    <>
      <main className='chat-window'>
        {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}
        <div ref={messagesEndRef} className='chat-disclaimer'>Conversations are stored and used to improve responses.</div>
      </main>
      {/* Enter and send message */}
      <form className='chat-input-area' onSubmit={sendMessage}>
        <textarea id='textareaInput' className="chat-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          onKeyUp={(e) => resizeTextarea(e)}
          placeholder="Tell us what you need help with." ></textarea>
        <button className='chat-btn' type="submit"
          onClick={(e) => resizeTextarea(e)}
          disabled={!formValue}>
            <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </button>
      </form>
    </>);
}

function ChatMessage(props) {
  // Get content and user Id
  const { content, role, createdAt } = props.message;
  // Get message sender
  const msgSender = role === "user" ? auth.currentUser.displayName : 'Assistant';
  // Get time message sent
  const timeStamp = createdAt !== null ? createdAt.toDate() : '';

  if (msgSender === 'Assistant') {
    return (<>
      <div className='chat-msg'>
        <AssistantMessage content={content} timeStamp={timeStamp} />
      </div>
    </>);
  } else {
    return (<>
      <div className='chat-msg'>
        <UserMessage content={content} timeStamp={timeStamp} displayName={msgSender} />
      </div>
    </>);
  }
}

function AssistantMessage(props) {
  return (
    <div className="msg left-msg">
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">Assistant</div>
          <div className="msg-info-time">{formatTime(props.timeStamp)}</div>
        </div>
        <div className="msg-text">
          {props.content}
        </div>
      </div>
    </div>
  );
};

function UserMessage(props) {
  return (
    <div className="msg right-msg">
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">{props.displayName}</div>
          <div className="msg-info-time">{formatTime(props.timeStamp)}</div>
        </div>
        <div className="msg-text">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default App;

// Font Awesome Library management
library.add(fas);
library.add(fab);