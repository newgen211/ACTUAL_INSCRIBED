import React, { useState, useEffect } from 'react';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import UserCard from './UserCard';

const FollowingPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState<string[]>([]); // Array of user IDs

  const sessionToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!sessionToken || !userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const url = `/api/users/${userId}/following`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (!Array.isArray(responseData.data.following)) {
          throw new Error('Response data format is incorrect');
        }

        setFollowing(responseData.data.following.map((item: any) => item.following._id)); // Extract the following IDs
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [sessionToken, userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Following
      </Typography>
      <Stack spacing={2}>
        {following.map((userId) => (
          <UserCard key={userId} userId={userId} />
        ))}
      </Stack>
    </Box>
  );
};

export default FollowingPage;
