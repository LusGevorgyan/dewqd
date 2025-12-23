import { useState, useRef, useCallback, useEffect } from "react";

export interface StepGeneratorResult<T> {
    currentStep: T;
    next: () => void;
    isFinished: boolean;
}

export function useStepGenerator<T>(
    generatorFactory: () => Generator<T, T, unknown>,
    initialStep?: T
): StepGeneratorResult<T> {
    // Use a ref to hold the generator instance so it persists across renders
    const generatorRef = useRef<Generator<T, T, unknown> | null>(null);

    const initializeGenerator = () => {
        const gen = generatorFactory();
        generatorRef.current = gen;
        return gen;
    };

    const getTargetStep = useCallback((target?: T): T => {
        let gen = generatorRef.current;
        if (!gen) {
            gen = initializeGenerator();
        }

        // If target is provided, we need to find it.
        // Since we can't look back, we inevitably have to restart logic or keep a history (not implemented here).
        // For simplicity and robustness with the "Back" button, we restart the generator to find the target.
        // This assumes the generator is deterministic and cheap.

        if (target) {
            // Restart generator to search from beginning
            gen = initializeGenerator();

            let result = gen.next();
            while (!result.done) {
                if (result.value === target) {
                    return result.value;
                }
                result = gen.next();
            }
            // If target not found (or done), fallback to re-initializing (first step)
            // But if it was the return value?
            if (result.value === target) return result.value;
        }

        // Default: get first step
        gen = initializeGenerator();
        const first = gen.next();
        return first.value;
    }, [generatorFactory]);

    const [currentStep, setCurrentStep] = useState<T>(() => {
        return getTargetStep(initialStep);
    });

    const [isFinished, setIsFinished] = useState(false);
    const lastInitialStepRef = useRef(initialStep);

    // Sync with initialStep changes (e.g. browser back button)
    useEffect(() => {
        // Only sync if initialStep actually changed externally (not just re-render/logic)
        if (initialStep !== lastInitialStepRef.current) {
            const step = getTargetStep(initialStep);

            // Avoid unnecessary state updates
            if (step !== currentStep) {
                setCurrentStep(step);
                setIsFinished(false);
            }
            lastInitialStepRef.current = initialStep;
        }
    }, [initialStep, getTargetStep, currentStep]);

    const next = useCallback(() => {
        if (!generatorRef.current) return;
        const result = generatorRef.current.next();
        setCurrentStep(result.value);

        if (result.done) {
            setIsFinished(true);
        }
    }, []);

    return {
        currentStep,
        next,
        isFinished,
    };
}
