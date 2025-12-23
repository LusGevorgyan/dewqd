export type CompanyInfoForm = {
    companyName: string;
    companyWebsite: string;
    location: string;
};

export type BrandingForm = {
    logo: FileList | null;
    description: string;
};

export type OnboardingFormValues = CompanyInfoForm & BrandingForm;
