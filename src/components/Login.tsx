import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import React from "react";
import { UseFormRegister, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { v4 as uuid } from "uuid";

interface LoginProps {
    onIdSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ onIdSubmit }: LoginProps): JSX.Element {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(formSchema),
    });

    const onFormSubmit = (data: any) => {
        // console.log(JSON.stringify(data));
        onIdSubmit(data.id);
    };

    return (
        <div>
            {/* <button
                onClick={() => console.log(localStorage.getItem("wechat-id"))}
            >
                asdklja
            </button> */}

            <TextField
                label="Id"
                {...registerWithErrorDisplay(register, "id", formState.errors)}
            />
            <Button variant="contained" onClick={handleSubmit(onFormSubmit)}>
                Login
            </Button>
            <Button variant="contained" onClick={() => onIdSubmit(uuid())}>
                Create A New Id
            </Button>
        </div>
    );
}

const formSchema = yup.object().shape({
    id: yup.string().required("Id is required"),
});

export function registerWithErrorDisplay(
    register: UseFormRegister<FieldValues>,
    id: string,
    errors: Record<string, any>
) {
    return {
        ...register(id),
        error: !!errors[id],
        helperText: errors[id]?.message,
    };
}
