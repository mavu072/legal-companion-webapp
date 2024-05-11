// React
import React, { useState, useRef, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatTime } from "../util";
import { getServerTimestamp } from '../firebase/util';

/**
 * Chat Components
 */

/**
 * Displays a chat user interface.
 * @returns ChatWindow component
 */
function ChatWindow(props) {
    const LEGAL_COMPANION_API_URL = "http://0.0.0.0:8000";
    const auth = props.firebaseAuth;
    const firestore = props.firestoreDatabase;

    // Query database for logged in user private messages.
    const messagesRef = firestore.collection(`users/${auth.currentUser.uid}/messages`);
    // Sort by createdAt.
    const query = messagesRef.orderBy('createdAt').limit(25);
    // Add use collection hook to populate messages with result from database query.
    const [messages] = useCollection(query);
    // Manage form state.
    const [formValue, setFormValue] = useState('');

    // Add ref for scrolling to newest message.
    const messagesEndRef = useRef(null);

    /**
     * Scrolls the target element into view with a smooth animation.
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // Add effect for when a new message is added to the collection. It will scroll into view.
    useEffect(() => { scrollToBottom(); }, [messages]);

    /**
     * Automatically resizes the target textarea based on the size of the content entered.
     * @param {*} event 
     */
    const resizeTextarea = (event) => {
        const textarea = document.querySelector('.chat-input');
        const minHeight = 50;
        textarea.style.height = `${minHeight}px`;
        let scrollHeight = event.target.scrollHeight;
        if (scrollHeight > minHeight) {
            textarea.style.height = `${scrollHeight}px`;
        }
    }

    /**
     * Is triggered when a user submits their form input.
     * Saves the form input in the messages collection and resets the form input.
     * Then triggers an API request to create a response to the user input.
     * @param {*} event 
     */
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

    /**
     * Sends a request to the Legal Companion API with the user input.
     * Then updates the messages collection with the API response.
     * @param {String} userMsg 
     * @param {String} userId 
     */
    const replyToMessage = async (userMsg, userId) => {
        // Create Request
        const apiEndpoint = `${LEGAL_COMPANION_API_URL}/assistant/ask/`;
        const reqPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userMsg })
        };
        // Send API Request
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
                {messages && messages.docs.map(msg =>
                    <ChatMessage
                        key={msg.id}
                        message={msg.data()}
                        currentUser={auth.currentUser}
                    />)}
                <div ref={messagesEndRef} className='chat-disclaimer'>You are currently using a beta version and conversations are stored to improve responses.</div>
            </main>
            
            <form className='chat-input-area' onSubmit={sendMessage}>
                <textarea id='textareaInput' className="chat-input"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    onKeyUp={(e) => resizeTextarea(e)}
                    placeholder="Tell us what you need help with..." ></textarea>
                <button className='chat-btn' type="submit"
                    onClick={(e) => resizeTextarea(e)}
                    disabled={!formValue}>
                    <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
                </button>
            </form>
        </>
    );
}

/**
 * Displays a chat message.
 * @param {*} props 
 * @returns ChatMessage component
 */
function ChatMessage(props) {
    // Get content and user Id
    const { content, role, createdAt } = props.message;
    // Get message sender
    const msgSender = role === "user" ? props.currentUser.displayName : 'assistant';
    // Get time message sent
    const timeStamp = createdAt !== null ? createdAt.toDate() : '';

    if (msgSender === 'assistant') {
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

/**
 * Wraps and formats the AI assistant's message.
 * @param {*} props 
 * @returns 
 */
function AssistantMessage(props) {
    return (
        <div className="msg left-msg">
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">Legal Companion</div>
                    <div className="msg-info-time">{formatTime(props.timeStamp)}</div>
                </div>
                <div className="msg-text">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

/**
 * Wraps and formats the user's message.
 * @param {*} props 
 * @returns 
 */
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

export default ChatWindow;