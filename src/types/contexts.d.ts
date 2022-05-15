import UtilSocket from "./socket";

export namespace Contexts {
    export namespace ContactContext {
        export interface ContactContextInterface {
            contacts: Contact[];
            createContact: (userId: string, username: string) => void;
        }

        export interface ContactsProviderProps {
            children?: React.ReactNode;
        }
    }

    export namespace ConversationContext {
        export interface ConversationContextInterface {
            conversations: FormattedConversation[];
            createConversation: (recipients: UserID[]) => void;
            selectedConversation: FormattedConversation;
            selectConversationIndex: React.Dispatch<
                React.SetStateAction<number>
            >;
            sendMessage: (recipients: UserID[], message: string) => void;
        }

        export interface ConversationProviderProps {
            id: string;
            children?: React.ReactNode;
        }
    }

    export namespace SocketContext {
        export interface SocketContextInterface {
            socket: UtilSocket;
        }

        export interface SocketProviderProps {
            id: string;
            children?: React.ReactNode;
        }
    }
}
