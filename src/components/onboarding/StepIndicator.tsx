
export const StepIndicator = ({ step }: { step: 1 | 2 }) => (
    <div className="flex items-center gap-5 mb-3">
        <div className={`h-1 flex-1 rounded ${step >= 1 ? "bg-step-active" : "bg-step-inactive"}`} />
        <span className="text-lg font-medium text-text-secondary">Step {step} of 2</span>
        <div className={`h-1 flex-1 rounded ${step === 2 ? "bg-step-active" : "bg-step-inactive"}`} />
    </div>
);
    