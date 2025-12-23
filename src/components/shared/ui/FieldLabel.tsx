import React from "react";

interface FieldLabelProps {
    label?: string;
    required?: boolean;
    className?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
    label,
    required,
    className = "",
}) => {
    if (!label) return null;

    let labelText = label;
    let isRequired = required;

    if (label.endsWith("*")) {
        labelText = label.slice(0, -1);
        isRequired = true;
    }

    return (
        <label className={`mb-2 block text-sm font-medium text-slate-900 ${className}`}>
            {labelText}
            {isRequired && <span className="text-red-500">*</span>}
        </label>
    );
};
