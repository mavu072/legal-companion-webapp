import { formatTime } from "../util";
/**
 * Chat Components
 */

/**
 * Wraps and formats the AI assistant's message.
 * @param {*} props 
 * @returns 
 */
export function AssistantMessage(props) {
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
export function UserMessage(props) {
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