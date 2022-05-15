import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { io } from "socket.io-client";
import { Contexts } from "../types/contexts";
import UtilSocket from "../types/socket";

const SocketContext =
    createContext<Contexts.SocketContext.SocketContextInterface>({
        socket: null as unknown as UtilSocket,
    });

export function useSockets(): Contexts.SocketContext.SocketContextInterface {
    return useContext(SocketContext);
}

export function SocketProvider({
    id,
    children,
}: Contexts.SocketContext.SocketProviderProps): JSX.Element {
    const [socket, setSocket] = useState<UtilSocket>();

    useEffect(() => {
        const newSocket: UtilSocket = io("http://localhost:3001", {
            query: { id },
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [id]);

    return (
        <SocketContext.Provider value={{ socket: socket as UtilSocket }}>
            {children}
        </SocketContext.Provider>
    );
}
