import Lobby from '../components/Lobby';
import Chat from '../components/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import '../Chat.css';

const ChatPage = () => {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);

    const joinRoom = async (user, email, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://blackfdapi.azurewebsites.net/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.onclose(e => {
                setConnection();
                setMessages([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { user, email, room });
            setConnection(connection);
        } catch (e) {
            console.error(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.error(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div id="body">
            <div className="app">
                {!connection
                    ? <Lobby joinRoom={joinRoom} />
                    : <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} />
                }
            </div>
        </div>
    );
}

export default ChatPage;