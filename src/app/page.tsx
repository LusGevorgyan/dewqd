  "use client";

  import { useRouter, useSearchParams } from "next/navigation";
  import { useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import { useCountries } from "../hooks/useCountries";
  import { FileUpload } from "../components/shared/ui/file-upload/FileUpload";
import { Button } from "../components/shared/ui/buttons/Button";

  type Step1Form = {
    companyName: string;
    companyWebsite: string;
    location: string;
  };

  type Step2Form = {
    logo: FileList | null;
    description: string;
  };

  export default function OnboardingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const stepParam = searchParams.get("step");
    const step: 1 | 2 = stepParam === "2" ? 2 : 1;

    const goToStep = (nextStep: 1 | 2) => router.push(`?step=${nextStep}`);

    // Step 1 Form
    const { register: registerStep1, handleSubmit: handleSubmitStep1, formState: { errors: errorsStep1 } } = useForm<Step1Form>();

    // Step 2 Form
    const { register: registerStep2, handleSubmit: handleSubmitStep2, control, formState: { errors: errorsStep2 } } = useForm<Step2Form>();

    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const onSubmitStep1 = (data: Step1Form) => {
      console.log("Step 1 data:", data);
      goToStep(2);
    };

    const onSubmitStep2 = (data: Step2Form) => {
      console.log("Step 2 data:", data);
    };

    const handleLogoChange = (files: FileList | null) => {
      if (files && files[0]) {
        setLogoPreview(URL.createObjectURL(files[0]));
      } else {
        setLogoPreview(null);
      }
    };

    const removeLogo = () => {
      setLogoPreview(null);
    };

    const email = "company@example.com";
    const initials = email.slice(0, 2).toUpperCase();
    const { data: countries, isLoading, isError } = useCountries();

    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-[956px]" style={{ background: "var(--bg-gradient)" }}>
          <div className="max-w-[590px] my-7 mx-auto">
            <StepIndicator step={step} />

            {step === 1 && (
              <>
                <h1 className="text-center text-2xl font-semibold text-slate-900">
                  Company Information
                </h1>
                <p className="mb-12 text-center text-sm text-slate-500">
                  Fill out your company information below
                </p>

                <form className="space-y-6" onSubmit={handleSubmitStep1(onSubmitStep1)}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Company Name*</label>
                    <input
                      {...registerStep1("companyName", { required: "Company Name is required" })}
                      placeholder="Enter company name"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                    />
                    {errorsStep1.companyName && <p className="text-red-500 text-xs mt-1">{errorsStep1.companyName.message}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Company Website*</label>
                    <input
                      {...registerStep1("companyWebsite", { required: "Website is required" })}
                      placeholder="Enter website"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                    />
                    {errorsStep1.companyWebsite && <p className="text-red-500 text-xs mt-1">{errorsStep1.companyWebsite.message}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
                    <select
                      {...registerStep1("location", { required: "Location is required" })}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                    >
                      <option value="">Enter Location</option>
                      {countries?.length && countries?.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errorsStep1.location && <p className="text-red-500 text-xs mt-1">{errorsStep1.location.message}</p>}
                  </div>

                  <Button text="Next" />
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-center text-2xl font-semibold text-slate-900">
                  Make your company recognizable
                </h1>
                <p className="mb-10 mt-2 text-center text-sm text-slate-500">
                  This helps identify your workspace
                </p>

                <form className="space-y-6" onSubmit={handleSubmitStep2(onSubmitStep2)}>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Logo (optional)</label>
                    <Controller
                        name="logo"
                        control={control}
                        render={({ field }) => (
                          <FileUpload
                            field={field}
                            initials={initials}
                          />
                        )}
                      />
                    <p className="text-xs text-slate-500 mt-1">JPG or PNG</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Description (optional)</label>
                    <textarea
                      {...registerStep2("description")}
                      rows={4}
                      className="w-full rounded-lg border px-4 py-3 text-sm"
                    />
                  </div>

                  <Button text="Finish" />
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const StepIndicator = ({ step }: { step: 1 | 2 }) => (
    <div className="flex items-center gap-5 w-full mx-auto mb-8">
      <div className={`h-1 flex-1 rounded ${step >= 1 ? "bg-[#0044C3]" : "bg-[#96979C]"}`} />
      <span className="text-sm text-slate-500 whitespace-nowrap">Step {step} of 2</span>
      <div className={`h-1 flex-1 rounded ${step === 2 ? "bg-[#0044C3]" : "bg-[#96979C]"}`} />
    </div>
  );
