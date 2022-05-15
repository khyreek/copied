import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { Contexts } from "../types/contexts";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSockets } from "./SocketProvider";

const ConversationContext =
    createContext<Contexts.ConversationContext.ConversationContextInterface>({
        conversations: [],
        createConversation: () => {},
        selectedConversation: { recipients: [], messages: [], selected: false },
        selectConversationIndex: () => {},
        sendMessage: () => {},
    });

export function useConversations() {
    return useContext(ConversationContext);
}

function arrayEquality<T>(arrA: T[], arrB: T[]) {
    if (arrA.length !== arrB.length) return false;

    arrA.sort();
    arrB.sort();

    return arrA.every((element, index) => {
        return element === arrB[index];
    });
}

export function ConversationProvider({
    id,
    children,
}: Contexts.ConversationContext.ConversationProviderProps): JSX.Element {
    const [conversations, setConversations] = useLocalStorage<Conversation[]>(
        "wechat-conversations",
        []
    );
    const { contacts } = useContacts();
    const { socket } = useSockets();

    const [selectedConversationIndex, setSelectedConversationIndex] =
        useState<number>(0);

    const createConversation = (recipients: UserID[]) => {
        setConversations((prevConversations) => [
            ...prevConversations,
            { recipients, messages: [] },
        ]);
    };

    const addMessageToConversation = useCallback(
        ({
            recipients,
            message,
            sender,
        }: {
            recipients: UserID[];
            message: string;
            sender: UserID;
        }) => {
            setConversations((prevConversations) => {
                let madeChange = false;
                const newMessage = { sender, message };

                const newConversations = prevConversations.map(
                    (conversation) => {
                        if (!arrayEquality(conversation.recipients, recipients))
                            return conversation;

                        madeChange = true;
                        return {
                            ...conversation,
                            messages: [...conversation.messages, newMessage],
                        };
                    }
                );

                if (madeChange) {
                    return newConversations;
                } else {
                    return [
                        ...prevConversations,
                        { recipients, messages: [newMessage] },
                    ];
                }
            });
        },
        [setConversations]
    );

    useEffect(() => {
        if (socket == null) return;

        socket.on("receive-message", addMessageToConversation);

        return () => {
            socket.off("receive-message");
        };
    }, [socket, addMessageToConversation]);

    const sendMessage = (recipients: UserID[], message: string) => {
        socket.emit("send-message", { recipients, message });

        addMessageToConversation({
            recipients,
            message,
            sender: id,
        });
    };

    const formattedConversations = conversations.map(
        (conversation: Conversation, index: number) => {
            const recipients: FormattedRecipient[] =
                conversation.recipients.map((recipient) => {
                    return {
                        userId: recipient,
                        username:
                            contacts.find(
                                (contact) => contact.userId === recipient
                            )?.username || recipient,
                    };
                });

            const messages: FormattedMessage[] = conversation.messages.map(
                (message) => {
                    const sender = contacts.find(
                        (contact) => contact.userId === message.sender
                    );

                    return {
                        ...message,
                        senderUsername:
                            // if sender's username is not found, use the message sender's userId
                            // must be message.sender and not sender.userId because the sender can
                            // be undefined if the message is from the user
                            sender?.username || (message?.sender as string),
                        fromMe: message.sender === id,
                    };
                }
            );

            return {
                ...conversation,
                recipients,
                messages,
                selected: index === selectedConversationIndex,
            };
        }
    );

    return (
        <ConversationContext.Provider
            value={{
                conversations: formattedConversations,
                createConversation,
                selectedConversation:
                    formattedConversations[selectedConversationIndex],
                selectConversationIndex: setSelectedConversationIndex,
                sendMessage,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
}
