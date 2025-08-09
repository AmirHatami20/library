import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    variant?: "auth" | "admin";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField(
    {
        label,
        name,
        type = 'text',
        value,
        placeholder,
        variant = "auth",
        onChange,
    }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-sm">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={variant === "auth" ? "auth-input" : "admin-input"}
                autoComplete="new-password"
            />
        </div>
    );
}
