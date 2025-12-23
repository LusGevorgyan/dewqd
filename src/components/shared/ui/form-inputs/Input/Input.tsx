import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ 
    label, error, className, ...props }, ref) => (
    <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
        <input
            ref={ref}
            className={`w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${className || ""}`}
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));
Input.displayName = "Input";
