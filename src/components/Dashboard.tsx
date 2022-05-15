import React from "react";
import Sidebar from "./Sidebar";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";

interface DashboardProps {
    id: string;
}

export default function Dashboard({ id }: DashboardProps): JSX.Element {
    const { selectedConversation } = useConversations();

    return (
        <div className="dashboard">
            {/* <button onClick={() => console.log(selectedConversation)}>
                debugging
            </button> */}
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    );
}
