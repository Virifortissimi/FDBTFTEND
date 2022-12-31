
const MessageContainer = ({ messages }) => {

    return <div className="messageRef">
        {messages.map((m, index) =>
            <div key={index}>
                {
                    typeof m.message === 'object' ?
                    <div>
                        <div className="message other-message">
                            <div>
                                <div className="name">{m.user}</div>
                                <div className="text">Name of food: {m.message.name}</div>
                            </div>
                        </div>
                        <div className="message other-message">
                            <div>
                                {/* <div className="name">{m.user}</div> */}
                                <div className="text">Ingredients: {m.message.ingredients}</div>
                            </div>
                        </div>
                        <div className="message other-message">
                            <div>
                                {/* <div className="name">{m.user}</div> */}
                                <div className="text">Preparations: {m.message.preparations}</div>
                            </div>
                        </div>
                    </div>
                     : m.message.includes("has joined the conversation")
                        ? <div className="update">{m.message}</div>
                        : m.user === "Ghosa"
                        ? 
                        <div className="message other-message">
                            <div>
                                <div className="name">{m.user}</div>
                                <div className="text">{m.message}</div>
                            </div>
                        </div>
                        : <div className="message my-message">
                            <div>
                                <div className="name">{m.user}</div>
                                <div className="text">{m.message}</div>
                            </div>
                        </div>
                }
            </div>
        )}
    </div >
}

export default MessageContainer;