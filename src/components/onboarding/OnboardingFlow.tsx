"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { OnboardingFormValues } from "@/types/onboarding";
import { useStepGenerator } from "@/hooks/useStepGenerator";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { BrandingStep } from "./steps/BrandingStep";
import { Button } from "@/components/shared/ui/buttons/Button";
import { StepIndicator } from "./StepIndicator";

type StepNames = "CompanyInfoStep" | "BrandingStep";

function* stepFlow(): Generator<StepNames, StepNames, unknown> {
  yield "CompanyInfoStep";
  yield "BrandingStep";
  return "BrandingStep";
}

export default function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step") as StepNames | null;

  // Generator is defined outside or static to avoid recreation
  const { currentStep, next } = useStepGenerator(stepFlow, stepParam || undefined);
  const methods = useForm<OnboardingFormValues>({
    mode: "onBlur",
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger(["companyName", "companyWebsite", "location"]);
    if (isStepValid) {
      next(); // Move generator
    }
  };

  useEffect(() => {
    if (currentStep && currentStep !== stepParam) {
      router.push(`?step=${currentStep}`);
    }
  }, [currentStep]);

  const onSubmit = (data: OnboardingFormValues) => {
    console.log("Form Submitted:", data);
  };

  const steps: Record<StepNames, JSX.Element> = {
    CompanyInfoStep: <CompanyInfoStep />,
    BrandingStep: <BrandingStep />,
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-full max-w-container-md bg-gradient-primary p-6">
        <div className="max-w-container-sm mx-auto">
          <StepIndicator step={currentStep === "CompanyInfoStep" ? 1 : 2} />

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {steps[currentStep]}  

              <div className="mt-section">
                {currentStep === "CompanyInfoStep" ? (
                  <Button
                    text="Next"
                    type="button"
                    onClick={handleNext}
                  />
                ) : (
                  <Button
                    text="Finish"
                    type="submit"
                  />
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

