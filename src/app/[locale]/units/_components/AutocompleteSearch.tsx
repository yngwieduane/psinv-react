// components/Autocomplete.js
'use client'
import { useState, useEffect } from "react";
type Project = {
  propertyName: string;
  propertyID: string; 
};
export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [iDValue, setIDValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        setShowDropdown(true);
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
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);
  
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
  };

  const handleOptionClick = (property:string,id:any) => (e:any) => {
    setIDValue(id);
    setInputValue(property);
    setShowDropdown(false);
  }
  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search project..."
        className="border rounded p-2 w-full"
        value={inputValue}
        onChange={handleInputChange}
      />
      {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}
      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border mt-1 z-10 max-h-60 overflow-auto shadow">
          {results.map((item, index) => (
            <li key={index} onClick={handleOptionClick(item.propertyName,item.propertyID)} className="p-2 hover:bg-gray-100 cursor-pointer">
              <strong>{item.propertyName}</strong>
              <br />
              <span className="text-sm text-gray-500">{item.propertyID}</span>
            </li>
          ))}
        </ul>
      )}
      {iDValue}
    </div>
  );
}