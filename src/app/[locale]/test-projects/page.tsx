
'use client'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Product {
    propertyID: string;
    propertyName: string;
    completionDate: string;
}

interface ApiResponse {
    result: Product[];
    totalCount: number;
}

async function fetchAllProducts(): Promise<Product[]> {
    let allData: Product[] = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
        const res = await fetch(`/api/external/pageprojects?page=${currentPage}`);
        if (!res.ok) throw new Error(`Failed on page ${currentPage}`);
        const json: ApiResponse = await res.json();

        allData = [...allData, ...json.result];
        totalPages = Math.round(json.totalCount / 100) + 1;
        currentPage++;
    }

    return allData;
}

function ProductsList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['all-products'],
        queryFn: fetchAllProducts,
        staleTime: 1000 * 60 * 10, // 10 min
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load products.</p>;
    //sort by date
    const sortedData = data?.sort(
        (a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime()
    );

    // Sort A-Z (case-insensitive)
    const sortedAZ = data?.sort((a, b) =>
        a.propertyName.localeCompare(b.propertyName, undefined, { sensitivity: 'base' })
    );


    // Sort by ID ascending (1 → 2 → 3)
    const sortedByIdAsc = data?.sort((a, b) => parseInt(a.propertyID) - parseInt(b.propertyID));

    const sortedByIdDesc = data?.sort((a, b) => parseInt(b.propertyID) - parseInt(a.propertyID));

    return (
        <div>
            <h1>All Projects = {data?.length}</h1>
            <ul>
                {sortedByIdDesc?.map((product) => (
                <li key={product.propertyID}>{product.propertyID} - {product.propertyName}</li>
                ))}
            </ul>
        </div>
    );
}

export default function ProductsPage() {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
        <ProductsList />
        </QueryClientProvider>
    );
}