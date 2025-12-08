import fs from 'fs/promises';
import path from 'path';

// Define the type for your API data structure
// Adjust this interface to match the actual structure of your API response
interface ApiData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define the absolute path to your data file
// Use a constant string literal for the filename for clarity
const DATA_FILENAME = 'api-data.json';
const DATA_DIR = 'data'; 
const DATA_FILE_PATH = path.join(process.cwd(), DATA_DIR, DATA_FILENAME);

/**
 * Writes data (array of ApiData) to a local JSON file.
 * @param data - The array of objects to write.
 */
export async function writeDataToFile(data: ApiData[]): Promise<{ success: boolean; error?: string }> {
  try {
    // Ensure the data directory exists
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    
    // Write the JSON string to the file, formatted nicely with 2 spaces
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`Successfully wrote ${data.length} items to: ${DATA_FILE_PATH}`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during file write';
    console.error('Error writing data to file:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Reads and parses data from the local JSON file.
 * @returns An array of ApiData or null if the file doesn't exist.
 */
export async function readDataFromFile(): Promise<ApiData[] | null> {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
    // Ensure the parsed result conforms to the ApiData[] type
    return JSON.parse(fileContents) as ApiData[];
  } catch (error: any) {
    // If the file doesn't exist (ENOENT), return null instead of throwing
    if (error.code === 'ENOENT') {
      console.log('Cache file not found. Returning null.');
      return null; 
    }
    // For other errors (e.g., bad JSON format), log and re-throw
    console.error('Error reading or parsing data from file:', error.message);
    throw error;
  }
}