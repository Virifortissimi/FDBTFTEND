import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import { useEffect, useRef } from "react";

const Chat = ({ messages, sendMessage, closeConnection }) => {
    const messageRef = useRef();    

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return <div className="screen chat-screen active">
        <div className="header">
            <div className="logo">FoodBot Chatroom</div>
            <button onClick={() => closeConnection()} id="exit-chat">Exit</button>
        </div>
        <div ref={messageRef} className="messages">
            <div className="update">Ghosa has joined the conversation</div>
            <MessageContainer messages={messages} />
        </div>
        <SendMessageForm sendMessage={sendMessage} />
    </div>
}

export default Chat;