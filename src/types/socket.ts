import { Socket } from "socket.io-client";

interface ServerToClientEvents {
    "receive-message": (data: {
        recipients: UserID[];
        message: string;
        sender: UserID;
    }) => void;
}

interface ClientToServerEvents {
    "send-message": (data: { recipients: UserID[]; message: string }) => void;
}

type UtilSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export default UtilSocket;
