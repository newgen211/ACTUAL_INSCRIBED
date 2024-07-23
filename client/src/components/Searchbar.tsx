import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import UserCard from './UserCard';
import { IUser } from '../pages/Homepage'; // Assuming IUser interface is defined in '../pages/Homepage'

interface User {
    userInfo: IUser | null;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [userInfoResults, setUserInfoResults] = useState<{ [userId: string]: IUser }>({});

    useEffect(() => {
        // Clear previous search results when query changes
        clearSearchResults();

        const debounceSearch = setTimeout(() => {
            if (query) {
                searchUsers(query);
            }
        }, 300); // Debounce input by 300ms

        return () => clearTimeout(debounceSearch);
    }, [query]);

    const clearSearchResults = () => {
        setUserInfoResults({});
    };

    const searchUsers = async (query: string) => {
        try {
            const response = await axios.post('/api/search', { query });
            const userIds = response.data.data.map((user: any) => user.userId);

            for (let i = 0; i < userIds.length; i++) {
                const userId = userIds[i];
                const userInfo = await getUserInfo(userId);
                if (userInfo) {
                    setUserInfoResults(prevState => ({
                        ...prevState,
                        [userId]: userInfo,
                    }));
                }
            }
        } catch (error) {
            console.error('Search error', error);
        }
    };

    const getUserInfo = async (userId: string): Promise<IUser | null> => {
        try {
            const response = await axios.get(`/api/users/${userId}`);
            return response.data.data; // Assuming API returns the entire IUser object
        } catch (error) {
            console.error(`Error fetching user info for user ID ${userId}`, error);
            return null; // Return null or handle error as appropriate
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
            {query !== "" && (
                <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid black'}}>
                    <ul>
                        {Object.keys(userInfoResults).map((userId, index) => (
                            <div key={index}>
                                <UserCard userId={userId} />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
