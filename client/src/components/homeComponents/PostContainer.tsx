import React, { useState, useEffect } from 'react';
import { Typography, Box, IconButton, Tooltip, Button } from '@mui/material';
import { Favorite, Delete, PersonAdd, PersonRemove } from '@mui/icons-material'; // Import icons
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
  const [isFollowing, setIsFollowing] = useState(false); // Initialize follow status

  useEffect(() => {
    // This effect could be used to check initial follow status if needed
  }, [userId]);

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
        setLikesCount(prevCount => prevCount + (isFavorite ? -1 : 1));
        setIsFavorite(!isFavorite);
      } else {
        const data = await response.json();
        if (data.code === 409) {
          console.log('User has already liked this post');
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
        console.log('Post deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete post:', errorData);
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
          setIsFollowing(true);
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

  const handleUnfollow = async () => {
    try {
      const url = `api/users/${userId}/unfollow`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          setIsFollowing(false);
          console.log('Unfollowed user successfully');
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to unfollow user:', errorData);
      }
    } catch (error) {
      console.error('Error unfollowing user', error);
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
          onClick={isFollowing ? handleUnfollow : handleFollow}
          variant="contained"
          color={isFollowing ? "secondary" : "primary"}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          startIcon={isFollowing ? <PersonRemove /> : <PersonAdd />}
        >
          {isFollowing ? "Unfollow" : "Follow"}
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
