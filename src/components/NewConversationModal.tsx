import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useContacts } from "../contexts/ContactsProvider";
import { IndexOfReturns } from "../utils/enums";
import TransitionModal from "./general/TransitionModal";
import MessageIcon from "@mui/icons-material/Message";
import { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

interface NewConversationModalProps {
    open: boolean;
    onClose: () => void;
}

export default function NewConversationModal({
    open,
    onClose,
}: NewConversationModalProps): JSX.Element {
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
    const [noContactSelectedError, setNoContactSelectedError] = useState("");

    const handleToggle = (value: UserID) => {
        return () => {
            const currentIndex = selectedContactIds.indexOf(value);
            const newChecked = [...selectedContactIds];

            if (currentIndex === IndexOfReturns.NO_VALUE_FOUND) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setSelectedContactIds(newChecked);
        };
    };

    const createHandler = () => {
        if (selectedContactIds.length === 0) {
            setNoContactSelectedError("You must select at least one contact.");
            return;
        }

        onLeaveModal();
        createConversation(selectedContactIds);
    };

    const onLeaveModal = () => {
        onClose();
        setSelectedContactIds([]);
        setNoContactSelectedError("");
    };

    return (
        <TransitionModal
            className="new-conversation-modal"
            open={open}
            onClose={onClose}
        >
            <header>
                <div>New Conversation</div>
                <Button color="error" onClick={onLeaveModal}>
                    x
                </Button>
            </header>

            <div>
                <div>Pick Users</div>
                <List className="">
                    {contacts.map((contact) => (
                        <ListItem
                            style={{ border: "1px solid black" }}
                            key={contact.userId}
                            // extra styling for no reason
                            secondaryAction={
                                <IconButton edge="end">
                                    <MessageIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton
                                onClick={handleToggle(contact.userId)}
                                dense
                            >
                                <Checkbox
                                    edge="start"
                                    checked={
                                        selectedContactIds.indexOf(
                                            contact.userId
                                        ) !== IndexOfReturns.NO_VALUE_FOUND
                                    }
                                    // allows tab switches to bypass this checkbox
                                    // which doesn't have to onClick handler so it
                                    // would do nothing on Enter anyways
                                    tabIndex={-1}
                                />
                                <ListItemText primary={contact.username} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>

            <footer>
                <div style={{ color: "red", marginRight: ".3%" }}>
                    {noContactSelectedError}
                </div>
                <Button
                    className="create-new-conversation-button"
                    onClick={createHandler}
                >
                    Create
                </Button>
            </footer>
        </TransitionModal>
    );
}
