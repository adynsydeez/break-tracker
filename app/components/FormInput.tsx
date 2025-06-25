import React from "react";

interface FormInputProps {
    label: string;
    type: "text" | "time";
    placeholder?: string;
}

const FormInput = ({ label, type, placeholder }: FormInputProps) => {
    return (
        <>
            <label className="label ">{label}</label>
            <input
                type={type}
                className="input min-w-[100%]"
                placeholder={placeholder}
            />
        </>
    );
};

export default FormInput;
