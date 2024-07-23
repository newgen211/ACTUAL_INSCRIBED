import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './Searchbar';
import UserCard from './UserCard';

export default function Rightbar() {
    const userId = localStorage.getItem('userId');

    return (
        <Box
            flex={2}
            p={2}
            borderLeft={1}
            sx={{
                display: { xs: 'none', sm: 'block' }
            }}
        >
            <Box position="fixed">
                <SearchBar />
                {userId && <UserCard userId={userId} />}
            </Box>
        </Box>
    );
}
