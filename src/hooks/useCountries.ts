import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCountryStore, Country } from "../store/useCountryStore";

const fetchCountries = async (): Promise<Country[]> => {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
    if (!res.ok) throw new Error("Failed to fetch countries");
    const data = await res.json();

    const countries = data.data.map((country: any) => ({
        name: country.name,
        code: country.iso2,
    }));

    return countries;
};

export const useCountries = () => {
    const setCountries = useCountryStore((state) => state.setCountries);

    const query = useQuery({
        queryKey: ["countries"],
        queryFn: fetchCountries,
    });

    useEffect(() => {
        if (query.data) {
            setCountries(query.data);
        }
    }, [query.data, setCountries]);

    return query;
};
