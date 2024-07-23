import React, { useState, useEffect, useCallback } from 'react';
import { Box, Stack, CircularProgress, Typography, Button } from '@mui/material';
import Post, { PostProps } from './PostContainer';
import NewPostForm from '../NewPostForm';

const HomePageComponent: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sessionToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchPosts = useCallback(async () => {
    if (!sessionToken) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = `api/users/${userId}/posts`;
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

      if (!Array.isArray(responseData.data.posts)) {
        throw new Error('Response data format is incorrect');
      }

      const data: PostProps[] = responseData.data.posts.map((post: any) => ({
        id: post._id,
        userId: userId,
        content: post.content,
        like_count: post.likesCount,
        repost_count: 0,
        comment_count: 0,
        created_at: post.created_at,
        updated_at: post.updated_at,
        username: post.username,
        owned : post.isOwnedByUser,
        comments: [],
      }));

      const sortedPosts = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setPosts(sortedPosts);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [sessionToken, userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = (newPost: PostProps) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div style={{ backgroundColor: 'theme.palette.background.default', height: '100vh' }}>
      <Box
        position="relative"
        left="0%"
        top="0"
        bottom="0"
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          bgcolor: 'secondary.main.contrastText',
          padding: 2,
          overflowY: 'auto',
        }}
      >
        <NewPostForm onPostCreated={fetchPosts} />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Stack spacing={2} direction="column">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userId={post.userId}
                content={post.content}
                like_count={post.like_count}
                repost_count={post.repost_count}
                comment_count={post.comment_count}
                created_at={post.created_at}
                updated_at={post.updated_at}
                comments={post.comments}
                owned = {post.owned}
                username={post.username}
              />
            ))}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default HomePageComponent;
