import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';

interface User {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    bio?: string;
    profile_image?: string;
    created_at: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (query) {
                searchUsers(query);
            }
        }, 300); // Debounce input by 300ms

        return () => clearTimeout(debounceSearch);
    }, [query]);

    const searchUsers = async (query: string) => {
        try {
            const response = await axios.post('/api/search', { query });
            setResults(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Search error', error);
        }
    };

    return (
        <div>
            <TextField
                fullWidth
                id="search-bar"
                name="search-bar"
                label="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                {results.map((user, index) => (
                    <div key={index}>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
