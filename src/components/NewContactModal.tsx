import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { useContacts } from "../contexts/ContactsProvider";
import { emptyRHFForm } from "../utils/helpers";
import TransitionModal from "./general/TransitionModal";
import { registerWithErrorDisplay } from "./Login";

interface NewContactModalProps {
    open: boolean;
    onClose: () => void;
}

const newContactSchema = yup.object().shape({
    id: yup.string().required("Id is required"),
    name: yup.string().required("Name is required"),
});

export default function NewContactModal({
    open,
    onClose,
}: NewContactModalProps): JSX.Element {
    const { register, handleSubmit, formState, reset, getValues } = useForm({
        resolver: yupResolver(newContactSchema),
    });
    const { createContact } = useContacts();

    const onSubmit = (data: FieldValues) => {
        // console.log(data);

        createContact(data.id, data.name);
        closeForm();
    };

    const closeForm = () => {
        onClose();
        reset(emptyRHFForm(getValues()));
    };

    return (
        <TransitionModal
            className="new-contact-modal"
            open={open}
            onClose={onClose}
        >
            <header>
                <div>Create Contact </div>
                <Button color="error" onClick={closeForm}>
                    x
                </Button>
            </header>
            <TextField
                label="Id"
                {...registerWithErrorDisplay(register, "id", formState.errors)}
            />
            <TextField
                label="Name"
                {...registerWithErrorDisplay(
                    register,
                    "name",
                    formState.errors
                )}
            />
            <Button
                className="create-new-contact-button"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
            >
                Create
            </Button>
        </TransitionModal>
    );
}
