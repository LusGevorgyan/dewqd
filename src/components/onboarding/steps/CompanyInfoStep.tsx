"use client";

import { useFormContext, Controller } from "react-hook-form";
import { OnboardingFormValues } from "@/types/onboarding";
import { useCountries } from "@/hooks/useCountries";
import { CustomSelect, SelectOption } from "@/components/shared/ui/custom-select/CustomSelect";
import { Input } from "@/components/shared/ui/form-inputs/Input/Input";
import { StepHeader } from "@/components/onboarding/StepHeader";

export const CompanyInfoStep = () => {
    const { data: countries } = useCountries();
    const countryOptions: SelectOption[] = countries?.map(c => ({ label: c.name, value: c.code })) || [];

    const { register, formState: { errors }, control } = useFormContext<OnboardingFormValues>();

    return (
        <div className="space-y-8">
            <StepHeader
                title="Company Information"
                description="Fill out your company information below"
            />

            <Input
                label="Company Name"
                required
                placeholder="Enter company name"
                {...register("companyName", { required: "Company Name is required" })}
                error={errors.companyName?.message}
            />

            <Input
                label="Company Website"
                required
                placeholder="Enter Website name"
                {...register("companyWebsite", { required: "Website is required" })}
                error={errors.companyWebsite?.message}
            />

            <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                    <CustomSelect {...field} options={countryOptions} required label="Location" placeholder="Enter Location" error={errors.location?.message} />
                )}
            />
        </div>
    );
};
