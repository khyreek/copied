import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations(): JSX.Element {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <div className="conversations-list">
            {conversations.map((conversation, index) => (
                // index temporary fix since this small project
                // won't have deletable conversations (unchanging order)
                <div
                    key={index}
                    className={`conversation-item ${
                        conversation.selected && "selected-conversation"
                    }`}
                    onClick={() => selectConversationIndex(index)}
                >
                    <ListItemButton>
                        {/* primary is akin to usernames.join(', ') */}
                        <ListItemText
                            primary={conversation.recipients.reduce(
                                (acc, str) =>
                                    acc !== ""
                                        ? `${acc}, ${str.username}`
                                        : `${acc}${str.username}`,
                                ""
                            )}
                        />
                    </ListItemButton>
                </div>
            ))}
        </div>
    );
}
