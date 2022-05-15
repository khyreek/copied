interface Contact {
    userId: string;
    username: string;
}

interface Conversation {
    recipients: UserID[];
    messages: Message[];
}

type UserID = string;
type Username = string;

interface Message {
    sender: UserID;
    message: string;
}

interface FormattedRecipient {
    // from Contact
    userId: string;

    // new
    username: Username | UserID;
}

interface FormattedMessage {
    // from Message
    sender: string;
    message: string;

    // new
    senderUsername: string;
    fromMe: boolean; // if the message was sent by the current user
}

interface FormattedConversation extends Conversation {
    recipients: FormattedRecipient[];
    selected: boolean;
    messages: FormattedMessage[];
}

