import { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from '../assets/img/logoblack.png';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [buttonText, setButtonText] = useState('Join');
    const [room, setRoom] = useState(null);


    return <div className="screen join-screen active">
        <Container>
            <Navbar.Brand href="/">
                <img src={logo} alt="Logo" />
            </Navbar.Brand>
        </Container>
        <form className="form"
            onSubmit={e => {
                e.preventDefault();
                joinRoom(user, email, room);
            }}>
            <h2>Chat with Ghosa</h2>
            <div className="form-input">
                <label>Username</label>
                <input type="text"
                    placeholder="Username" id="username"
                    onChange={e => setUser(e.target.value)} required />
            </div>
            <div className="form-input">
                <label>Email</label>
                <small style={{ color: "#888" }}>We'll never share your email with anyone else.</small>
                <input type="email"
                    placeholder="Email" id="username"
                    onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-input">
                <button id="join-user" type="Submit" onClick={e => {setButtonText("Connecting...");}} disabled={!user}>{buttonText}</button>
            </div>
        </form>
    </div>
}

export default Lobby;