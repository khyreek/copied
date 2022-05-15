import { createContext, useContext } from "react";
import { Contexts } from "../types/contexts";
import useLocalStorage from "../utils/hooks/useLocalStorage";

const ContactsContext =
    createContext<Contexts.ContactContext.ContactContextInterface>({
        contacts: [{ userId: "default", username: "value" }],
        createContact: () => "default value",
    });

export function useContacts() {
    return useContext(ContactsContext);
}

export function ContactProvider({
    children,
}: Contexts.ContactContext.ContactsProviderProps): JSX.Element {
    const [contacts, setContacts] = useLocalStorage<Contact[]>(
        "wechat-contacts",
        []
    );

    const createContact = (userId: string, username: string) => {
        setContacts((prevContacts) => [...prevContacts, { userId, username }]);
    };

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    );
}
