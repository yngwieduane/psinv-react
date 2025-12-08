import { NextResponse } from 'next/server';
import { writeDataToFile } from '@/lib/file-utils'; // Adjust path if needed

// Define the external API URL
const EXTERNAL_API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Using a public test API

// Define a type for the successful response body
interface CacheSuccessResponse {
  message: string;
  count: number;
}

/**
 * Handles the POST request to fetch and cache the data.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(): Promise<NextResponse<CacheSuccessResponse | { message: string; error?: string }>> {
  try {
    // 1. Fetch data from the external API
    const apiResponse = await fetch(EXTERNAL_API_URL, {
        // Ensure this runs only on the server, not necessary for app router 
        // but good practice if it were in a server component
        cache: 'no-store' 
    });

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch external API data' },
        { status: apiResponse.status }
      );
    }

    // 2. Parse the data and type-cast it
    const data = await apiResponse.json();

    // 3. Store the data in the local file
    const fileResult = await writeDataToFile(data); // TypeScript ensures 'data' matches the ApiData[] type

    if (!fileResult.success) {
       return NextResponse.json(
        { message: 'Failed to write data to file', error: fileResult.error },
        { status: 500 }
      );
    }

    // 4. Respond with a success message
    return NextResponse.json(
      { message: 'API data successfully fetched and stored in file', count: data.length }, 
      { status: 200 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown internal server error occurred';
    console.error('API Route Error:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}