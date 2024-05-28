import './Chat.css';
// React
import React, { useState, useRef, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

// Material
import SkeletonChat from './Skeleton';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InlineLoader } from '../app/Loader';
import { formatTime } from "../../util/util";
import { getServerTimestamp } from '../../firebase/util';
import { resizeTextarea } from './util';

// Local Components
import { FileUpload } from '../upload/Upload';
import SnackBarNotification from '../notification/SnackBar';
import { ComplianceReport } from '../upload/ComplianceReport';

import axios from 'axios';

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

    // Get current user
    const { uid } = auth.currentUser;
    // Query database for logged in user private messages.
    const messagesRef = firestore.collection(`users/${uid}/messages`);
    // Sort by createdAt.
    const query = messagesRef.orderBy('createdAt').limit(100);
    // Add use collection hook to populate messages with result from database query.
    const [messages] = useCollection(query);
    // Manage form state.
    const [formValue, setFormValue] = useState('');
    // Display user messages and errors
    const [message, setMessage] = useState('');

    // Add ref for scrolling to newest message.
    const messagesEndRef = useRef(null);
    // Scrolls the target element into view with a smooth animation.
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // Add effect for when a new message is added to the collection. It will scroll into view.
    useEffect(() => { scrollToBottom(); }, [messages]);

    // Manage reply loader
    const [isLoading, setIsLoading] = useState(true);
    // Add effect for loader
    useEffect(() => { setIsLoading(false); }, []);

    /**
     * Is triggered when a user submits their form input.
     * Saves the form input in the messages collection and resets the form input.
     * Then triggers an API request to create a response to the user input.
     * @param {Event} event 
     */
    const sendMessage = async (event) => {
        event.preventDefault();
        // Clear form - state will only take place on the next render
        setFormValue('');
        // Set Loader
        setIsLoading(true);
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
        const apiEndpoint = `${LEGAL_COMPANION_API_URL}/assistant/messages/send`;
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
                // Parse response
                const responseJson = await response.json();
                // Stop loading
                setIsLoading(false);

                // Check response
                if (response.ok) {
                    // Create firestore document
                    const newDoc = {
                        content: responseJson.text,
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
                    await messagesRef.add(newDoc)
                        .catch((error) => {
                            console.log(error.message);
                            throw new Error('Your message could not be processed.')
                        });
                } else {
                    // Handle error response
                    if (responseJson.error) {
                        // Create firestore document
                        const newDoc = {
                            content: responseJson.error,
                            createdAt: getServerTimestamp(),
                            role: "assistant",
                            userId: userId
                        }
                        // Save new document
                        await messagesRef.add(newDoc)
                            .catch((error) => {
                                console.log(error.message);
                                throw new Error('Your message could not be processed.')
                            });
                    } else {
                        throw new Error(response.statusText);
                    }
                }
            })
            .catch((error) => {
                setMessage(error.message);
            });
    }

    /**
     * Set uploaded files state.
     * @param {Array<File>} files 
     */
    const handleFileUpload = async (files) => {
        // Handle
        if (files && files.length > 0) {
            // File names
            const fileNames = Array.from(files).map((file) => file.name).join(', ');

            // Set Loader
            setIsLoading(true);

            // Save new message doc
            await messagesRef.add({
                content: `Uploaded: ${fileNames}`,
                createdAt: getServerTimestamp(),
                role: "user",
                userId: uid,
            });

            // Create form data
            const formData = new FormData();
            // Append each file to the FormData object
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i], files[i].name);
            }

            // Compliance checking
            try {
                await sendFilesForComplianceChecking(formData, fileNames, uid);
            } catch (error) {
                setMessage(error.message);
            }

            // End loader
            setIsLoading(false);
        } else {
            setMessage('No files selected');
        }
    }

    const sendFilesForComplianceChecking = async (formData, fileNames, userId) => {
        // Send files
        await axios.post(`${LEGAL_COMPANION_API_URL}/assistant/files/send/`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(async (response) => {
            // Create firestore document
            const newDoc = {
                content: `Compliance Report: ${fileNames}`,
                data: response.data,
                createdAt: getServerTimestamp(),
                role: "assistant",
                userId: userId
            }
            // Save new document
            await messagesRef.add(newDoc);
            
        }).catch(error => {
            throw new Error(error.message)
        });
    }

    return (
        <>
            {message && <SnackBarNotification message={message} />}
            <main className='chat-window'>
                {messages ? messages && messages.docs.map(msg =>
                    <ChatMessage
                        key={msg.id}
                        message={msg.data()}
                        currentUser={auth.currentUser}
                    />) : <SkeletonChat />}
                {isLoading ? <InlineLoader /> : <></>}
                <div ref={messagesEndRef} className='chat-disclaimer'>
                    You are currently using a beta version and conversations are stored to improve responses.
                </div>
            </main>
            <form className='chat-input-area' onSubmit={sendMessage}>
                <div className='chat-input-wrapper'>
                    <FileUpload
                        onFileUpload={(files) => handleFileUpload(files)} />
                    <textarea id='textareaInput' className="chat-input"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        onKeyUp={(e) => resizeTextarea(e)}
                        placeholder="Send a message or upload file" >
                    </textarea>
                    <button className='app-btn chat-btn' type="submit" disabled={!formValue}>
                        <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
                    </button>
                </div>
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
    const { content, role, createdAt, data } = props.message;
    // Get message sender
    const msgSender = role === "user" ? props.currentUser.displayName : 'assistant';
    // Get time message sent
    const timeStamp = createdAt !== null ? createdAt.toDate() : '';

    if (msgSender === 'assistant') {
        if (data && data.type === 'compliance_report') {
            return (<>
                <div className='chat-msg'>
                    <AssistantMessage content={content} timeStamp={timeStamp} />
                </div>
                {data.items.map((item, index) => (
                    <div className='chat-report'>
                        <ComplianceReport report={item} key={index} />
                    </div>
                ))}
            </>);
        } else {
            return (<>
                <div className='chat-msg'>
                    <AssistantMessage content={content} timeStamp={timeStamp} />
                </div>
            </>);
        }
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