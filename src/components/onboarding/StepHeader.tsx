import React from "react";

interface StepHeaderProps {
    title: string;
    description: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ title, description }) => {
    return (
        <div className="mb-82">
            <h1 className="text-center text-30 font-medium text-text-primary mb-2">{title}</h1>
            <p className="text-center text-18 font-medium text-text-secondary">{description}</p>
        </div>
    );
};
