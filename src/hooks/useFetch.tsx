import { useEffect, useState } from "react";

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

const useFetch = <T,>(url: string): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Could not fetch the data for that resource");
                }
                const result: T = await response.json();
                setData(result);
                setError(null);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error message:", error.message);
                    console.error("Error stack:", error.stack);
                    setError(error.message);
                } else {
                    console.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
