import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: "primary" | "secondary";
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
    text, 
    children, 
    variant = "primary", 
    className, 
    ...props 
}) => {
    const base = "mt-2 w-full py-3 rounded-lg text-sm font-medium text-white transition hover:opacity-90 flex justify-center items-center gap-2";
    const style = variant === "primary"
        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
        : "bg-gray-400 hover:bg-gray-500";

    return (
        <button className={`${base} ${style} ${className || ""}`} {...props}>
            {text || children}
        </button>
    );
};
