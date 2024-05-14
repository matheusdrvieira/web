import { useCallback, useState } from "react";

type ReturnType = {
    filters: SearchFilter,
    handleFilters: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type SearchFilter = {
    filter: string,
}

const defaultFilters: SearchFilter = {
    filter: "",
};

export default function useFilter(): ReturnType {
    const [filters, setFilters] = useState<SearchFilter>(defaultFilters);

    const handleFilters = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilters((prevState) => ({
                ...prevState,
                filter: event.target.value
            }));
        },
        []
    );

    return {
        filters,
        handleFilters
    };
}
