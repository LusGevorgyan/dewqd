"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { FieldLabel } from "../FieldLabel";

export type SelectOption = {
    label: string;
    value: string;
};

interface CustomSelectProps {
    value?: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    label?: string;
    required?: boolean;
}

export const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
    ({ value, onChange, options, placeholder = "Select...", disabled, error, label, required = false }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [search, setSearch] = useState("");
        const internalRef = useRef<HTMLDivElement>(null);
        const combinedRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;
        const inputId = useId();

        const selectedOption = options.find((o) => o.value === value);
        const filteredOptions = options.filter((o) =>
            o.label.toLowerCase().includes(search.toLowerCase())
        );

        useEffect(() => {
            const handler = (e: MouseEvent) => {
                if (combinedRef.current && !combinedRef.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handler);
            return () => document.removeEventListener("mousedown", handler);
        }, [combinedRef]);

        return (
            <div ref={combinedRef} className="relative w-full">
                <FieldLabel label={label} required={required} />
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((p) => !p)}
                    className="w-full rounded-lg border border-border-primary px-4 py-3 text-sm text-left bg-white flex items-center justify-between"
                >
                    <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
                        {selectedOption?.label || placeholder}
                    </span>
                    {isOpen ? ( 
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                        <input
                            id={inputId}
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full border-b px-3 py-2 text-sm outline-none"
                        />

                        <ul className="max-h-48 overflow-auto">
                            {filteredOptions.length === 0 && (
                                <li className="px-4 py-2 text-sm text-slate-400">No results</li>
                            )}
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 ${option.value === value ? "bg-slate-100 font-medium" : ""
                                        }`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {error && <p className="absolute -bottom-3.5 text-red-500 text-10">{error}</p>}
            </div>
        );
    }
);

CustomSelect.displayName = "CustomSelect";
