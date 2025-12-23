import React, { InputHTMLAttributes } from "react";
import { FieldLabel } from "../../FieldLabel";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label, error, className, required = false, ...props }, ref) => (
    <div className="w-full relative">
        <FieldLabel label={label} required={required} />

        <input
            ref={ref}
            className={`placeholder:text-text-tertiary w-full rounded-lg border border-border-primary px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${className || ""}`}
            {...props}
        />
        {error && <p className="absolute -bottom-3.5 text-red-500 text-10 mt-1">{error}</p>}
    </div>
));
Input.displayName = "Input";
    