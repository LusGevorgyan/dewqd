import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, className, ...props }, ref) => (
    <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
        <select
            ref={ref}
            className={`w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${className || ""}`}
            {...props}
        >
            <option value="">Select</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));
CustomSelect.displayName = "CustomSelect";
