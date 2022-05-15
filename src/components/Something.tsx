import React from "react";
import { ContactProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function Something(): JSX.Element {
    const [id, setId] = useLocalStorage("wechat-id", "");

    return (
        <div>
            {/* checks if an id change went through */}
            {id ? (
                <SocketProvider id={id}>
                    <ContactProvider>
                        <ConversationProvider id={id}>
                            <Dashboard id={id} />
                        </ConversationProvider>
                    </ContactProvider>
                </SocketProvider>
            ) : (
                <Login onIdSubmit={setId} />
            )}
        </div>
    );
}
