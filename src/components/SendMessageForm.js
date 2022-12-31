import { useState } from "react";


const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }} className="typebox">
        <input type="text"
            id="message-input"
            placeholder="What would you like to cook?"
            onChange={e => setMessage(e.target.value)}
            value={message} />
        <button type="submit" id="send-message" disabled={!message}>Send</button>
    </form>
}

export default SendMessageForm;