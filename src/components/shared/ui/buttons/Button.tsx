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
    const base = "cursor-pointer w-full py-3 rounded-button text-sm font-semibold text-white text-sm transition hover:opacity-90 place-items-center";
    const style = variant === "primary" && "bg-gradient-secondary"

    return (
        <button className={`${base} ${style} ${className || ""}`} {...props}>
            {text || children}
        </button>
    );
};

Button.displayName = "Button";

