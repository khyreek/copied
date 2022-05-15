import { Button, TextareaAutosize } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation(): JSX.Element {
    const [message, setMessage] = useState("");
    const { sendMessage, selectedConversation } = useConversations();

    const setRef = useCallback((node: HTMLDivElement | null) => {
        node?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const submitMessage = () => {
        if (message.length === 0) return;
        
        sendMessage(
            selectedConversation.recipients.map(
                (recipient) => recipient.userId
            ),
            message
        );

        setMessage("");
    };

    return (
        <div className="message-board">
            <div className="messages">
                {selectedConversation.messages.map((message, i: number) => {
                    const lastMessage =
                        i === selectedConversation.messages.length - 1;

                    return (
                        <div key={i} className="message">
                            <div
                                ref={lastMessage ? setRef : null}
                                className={`${
                                    message.fromMe ? "message-from-me" : ""
                                }`}
                            >
                                {message.message}
                            </div>
                            <div className="message-author-text">
                                {message.fromMe
                                    ? "You"
                                    : message.senderUsername}
                            </div>
                        </div>
                    );
                })}
            </div>
            <footer>
                <TextareaAutosize
                    className="message-input"
                    placeholder="Send Message"
                    required
                    value={message}
                    onChange={(e): void => setMessage(e.target.value)}
                />
                <Button
                    className="send-message-button"
                    variant="contained"
                    onClick={submitMessage}
                >
                    Send
                </Button>
            </footer>
        </div>
    );
}
