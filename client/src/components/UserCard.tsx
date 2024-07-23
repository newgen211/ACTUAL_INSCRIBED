import React, { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import api from '../util/api'; // Ensure this utility is correctly configured

interface UserCardProps {
  userId: string;
}

const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null); // Using `any` type for simplicity
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const userResponse = await api.get(`/api/users/${userId}`);
        const userData = userResponse.data.data; // Accessing the 'data' field
        setUser(userData);

        // Fetch followers count
        const followersResponse = await api.get(`/api/users/${userId}/followers`);
        const followersData = followersResponse.data.data;
        setFollowersCount(followersData.numberOfFollowers); // Directly accessing number of followers

        // Fetch following count
        const followingResponse = await api.get(`/api/users/${userId}/following`);
        const followingData = followingResponse.data.data;
        setFollowingCount(followingData.numberOfFollowing); // Directly accessing number of following
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 345, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', my: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src="https://via.placeholder.com/64" // Placeholder for avatar image
            alt={user?.username}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{user?.username}</Typography>
            <Typography variant="body2">{user?.first_name} {user?.last_name}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            <strong>{followersCount}</strong> Followers
          </Typography>
          <Typography variant="body2">
            <strong>{followingCount}</strong> Following
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Joined on {new Date(user?.created_at).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
