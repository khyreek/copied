import { Server, Socket } from "socket.io";

interface ServerToClientEvents {
    "receive-message": (data: {
        recipients: string[];
        sender: string;
        message: string;
    }) => void;
}

interface ClientToServerEvents {
    "send-message": (data: { recipients: string[]; message: string }) => void;
}

interface InterServerEvents {}

interface SocketData {
    recipients: string[];
    message: string;
    sender: string;
}

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(3001, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

io.on(
    "connection",
    (
        socket: Socket<
            ClientToServerEvents,
            ServerToClientEvents,
            InterServerEvents,
            SocketData
        >
    ) => {
        console.log("connection");
        const id = socket.handshake.query.id;
        if (typeof id !== "string")
            throw new Error("id is not a string, this is not expected");

        socket.join(id);

        socket.on("send-message", ({ recipients, message }) => {
            console.log(recipients);
            recipients.forEach((recipient) => {
                const newRecipients = recipients.filter(
                    (recip) => recip !== recipient
                );
                newRecipients.push(id);

                socket.broadcast.to(recipient).emit("receive-message", {
                    recipients: newRecipients,
                    sender: id,
                    message,
                });
            });
        });
    }
);

console.log("server on");
