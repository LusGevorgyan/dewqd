import { create } from "zustand";

export interface Country {
  name: string;
  code: string;
  flag?: string;
  region?: string;
}

interface CountryStore {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  setCountries: (countries) => set({ countries }),
}));
