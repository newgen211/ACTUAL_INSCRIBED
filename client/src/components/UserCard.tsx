import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';

export default function UserCard() {
    // Example user data
    const user = {
        username: 'Username',
        avatar: 'https://via.placeholder.com/150',
        followers: 1200,
        following: 180,
        bio: 'This is a short bio of the user.',
    };

    return (
        <Card sx={{ maxWidth: 345, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', my: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        src={user.avatar}
                        alt={user.username}
                        sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">{user.username}</Typography>
                        
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="text">
                        <Typography variant="body2">
                            <strong>{user.followers}</strong> Followers
                        </Typography>
                    </Button>
                    <Button variant="text">
                        <Typography variant="body2">
                            <strong>{user.following}</strong> Following
                        </Typography>
                    </Button>
                </Box>

                <Box>
                    <Typography variant="body2" color="textSecondary">
                        {user.bio}
                    </Typography>
                </Box>

            </CardContent>
        </Card>
    );
}
