import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import api from '../util/api'; // Ensure this utility is correctly configured
import Post, { PostProps } from '../components/homeComponents/PostContainer';

const DiscoverComponent: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/users/discover-feed');
        const postData = response.data.data.posts;

        // Map the posts data to PostProps structure
        const formattedPosts: PostProps[] = postData.map((post: any) => ({
          id: post._id,
          userId: post.user._id, // Assuming userId is available in the user object
          username: post.user.username, // Assuming username is available in the user object
          content: post.content,
          like_count: post.like_count || 0, // Default to 0 if not provided
          repost_count: post.repost_count || 0, // Default to 0 if not provided
          comment_count: post.comment_count || 0, // Default to 0 if not provided
          created_at: post.created_at,
          updated_at: post.updated_at,
          comments: post.comments || [], // Default to empty array if not provided
        }));

        setPosts(formattedPosts);
      } catch (error) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Box sx={{ my: 2 }} flex={4}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}>
          <CardContent>
            <Post
              id={post.id}
              userId={post.userId}
              username={post.username}
              content={post.content}
              like_count={post.like_count}
              repost_count={post.repost_count}
              comment_count={post.comment_count}
              created_at={post.created_at}
              updated_at={post.updated_at}
              comments={post.comments}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DiscoverComponent;
