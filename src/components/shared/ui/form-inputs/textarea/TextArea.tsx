import React, { TextareaHTMLAttributes } from "react";
import { FieldLabel } from "../../FieldLabel";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, required = false, ...props }, ref) => (
    <div className="w-full">
        <FieldLabel label={label} required={required} />

        <textarea
            ref={ref}

            className={`h-40 w-full rounded-lg border border-border-primary p-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${className || ""}`}
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));
Textarea.displayName = "Textarea";
