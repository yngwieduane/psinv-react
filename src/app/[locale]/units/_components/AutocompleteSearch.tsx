// components/Autocomplete.js

import { useState, useEffect } from "react";
type Project = {
propertyName: string;
propertyID: string; // or whatever fields your external API returns
};
export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(`/api/external/search?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data.result);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search project..."
        className="border rounded p-2 w-full"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border mt-1 z-10 max-h-60 overflow-auto shadow">
          {results.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              <strong>{item.propertyName}</strong>
              <br />
              <span className="text-sm text-gray-500">{item.propertyID}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}