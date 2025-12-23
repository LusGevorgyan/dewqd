import React, { useState } from "react";

interface FileUploadProps {
    onChange?: (files: FileList | null) => void;
    value?: FileList | null;
    initials?: string;
    label?: string;
    className?: string;
    size?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onChange,
    value,
    initials = "NA",
    label = "Upload Logo",
    className = "",
    size = 64,
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (files: FileList | null) => {
        if (files && files[0]) {
            setPreview(URL.createObjectURL(files[0]));
            onChange?.(files);
        } else {
            setPreview(null);
            onChange?.(null);
        }
    };

    const remove = () => {
        setPreview(null);
        onChange?.(null);
    };

    return (
        <div className={`flex items-center gap-4 rounded-lg border bg-white px-4 py-3 ${className}`}>
            {preview ? (
                <div className="relative" style={{ width: size, height: size }}>
                    <img
                        src={preview}
                        alt="Preview"
                        className="rounded-full object-cover"
                        style={{ width: size, height: size }}
                    />
                    <button
                        type="button"
                        onClick={remove}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div
                    className="flex items-center justify-center rounded-full text-lg font-semibold text-white"
                    style={{ width: size, height: size, background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
                >
                    {initials}
                </div>
            )}
            <label className="text-blue-500 underline cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleChange(e.target.files)}
                />
                {label}
            </label>
        </div>
    );
};
