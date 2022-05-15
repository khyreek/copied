import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
    const { contacts } = useContacts();

    return (
        <div className="contact-list">
            {contacts.map((contact) => (
                // div here cause listitembutton isn't considered an element
                // in css, and it needs to be for styling bottom borders
                <div key={contact.userId}>
                    <ListItemButton>
                        <ListItemText primary={contact.username} />
                    </ListItemButton>
                </div>
            ))}
        </div>
    );
}
