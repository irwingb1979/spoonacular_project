"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <form onSubmit={handleSubmit} className="flex gap-2 min-w-lg">
                <input
                    className="input input-bordered text-gray-600 bg-white w-full max-w-md shadow-lg rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    type="text"
                    placeholder="Search for a recipe..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;