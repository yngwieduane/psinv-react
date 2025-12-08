import { readDataFromFile } from '@/lib/file-utils'; // Adjust path if needed
import CacheButton from './_components/CacheButton';

export default async function CachedDataPage() {
  // readDataFromFile is a server-only function that returns ApiData[] | null
  const data = await readDataFromFile(); 

  return (
    <main style={{ padding: '20px' }}>
      <h1>📁 Data Loading Example</h1>
      <CacheButton />
      <hr />
      
      {data ? (
        <>
          <h2>Loaded {data.length} Items from Local Cache File</h2>
          <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {/* Display the first few items of the cached data */}
              {JSON.stringify(data.slice(0, 5), null, 2)}
              {data.length > 5 ? `\n...and ${data.length - 5} more items.` : ''}
            </pre>
          </div>
        </>
      ) : (
        <h2>No Cached Data Found</h2>
      )}
    </main>
  );
}