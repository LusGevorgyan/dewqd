import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, ...props }, ref) => (
    <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
        <textarea
            ref={ref}
            className={`w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${className || ""}`}
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));
Textarea.displayName = "Textarea";
