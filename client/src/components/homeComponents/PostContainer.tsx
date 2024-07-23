import React, { useState, useEffect } from 'react';
import { Typography, Box, IconButton, Tooltip, Button } from '@mui/material';
import { Favorite, Delete, PersonAdd } from '@mui/icons-material'; // Import PersonAdd icon for follow button
import CommentSection from './CommentSection'; // Import CommentSection component

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface PostProps {
  id: string; // This is the post ID
  userId: string;
  username: string; // Added username field
  content: string;
  like_count: number;
  repost_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  owned: boolean;
  comments?: Comment[];
}

const Post: React.FC<PostProps> = ({ id, userId, username, content, like_count, repost_count, comment_count, created_at, updated_at, owned, comments = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(like_count);

  useEffect(() => {
    // Initialize the like status based on the initial props or any other logic
    // You might need to fetch this information if it's not available initially
  }, [id]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sessionToken = localStorage.getItem('token');

  const handleFavoriteClick = async () => {
    try {
      const url = isFavorite ? `api/posts/${id}/unlike` : `api/posts/${id}/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the UI based on whether we are liking or unliking
        if (isFavorite) {
          setLikesCount(prevCount => prevCount - 1);
        } else {
          setLikesCount(prevCount => prevCount + 1);
        }
        setIsFavorite(!isFavorite);
      } else {
        const data = await response.json();
        if (data.code === 409) {
          // Handle the case where the user has already liked the post
          console.log('User has already liked this post');
          // Optionally, you can provide user feedback or handle this case differently
        }
      }
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  const handleDelete = async () => {
    try {
      const url = `api/posts/${id}`; // Adjust the URL as needed
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful delete
        console.log('Post deleted successfully');
        // You might need to refresh or redirect here
        // For example, you could call a function to update the post list or navigate to another page
      } else {
        const errorData = await response.json();
        console.error('Failed to delete post:', errorData);
        // Optionally, provide user feedback based on the error
      }
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleFollow = async () => {
    try {
      const url = `api/users/${userId}/follow`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.code === 409) {
          console.log('Already following user');
        } else {
          console.log('Followed user successfully');
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to follow user:', errorData);
      }
    } catch (error) {
      console.error('Error following user', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative', // Make sure the position is relative for the delete button to be absolutely positioned
      }}
    >
      {owned ? (
        <IconButton
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'gray',
          }}
        >
          <Delete />
        </IconButton>
      ) : (
        <Button
          onClick={handleFollow}
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          startIcon={<PersonAdd />}
        >
          Follow
        </Button>
      )}
      <Typography variant="h6" gutterBottom onClick={toggleExpand} sx={{ cursor: 'pointer' }}>
        {username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <Typography variant="body2">{likesCount} Likes</Typography>
        <Tooltip title={isFavorite ? "Unfavorite" : "Favorite"}>
          <IconButton onClick={handleFavoriteClick} sx={{ color: isFavorite ? 'red' : 'gray' }}>
            <Favorite />
          </IconButton>
        </Tooltip>
      </Box>
      {isExpanded && (
        <CommentSection postId={id} />
      )}
    </Box>
  );
};

export default Post;
