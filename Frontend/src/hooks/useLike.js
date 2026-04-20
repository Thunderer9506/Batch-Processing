import { useState } from 'react';
import { likePost, bombardLikes as apiBombardLikes } from '../utils/api';
import { LIKE_COUNT_INCREMENT, BOMBARD_LIKE_COUNT } from '../constants/app';

const useLike = (initialPosts) => {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = async (postId, setSelectedPost) => {
    // Update UI immediately for better UX
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? {...post, likes: post.likes + LIKE_COUNT_INCREMENT} : post
      )
    );

    // Update selected post if it's the same one
    if (setSelectedPost) {
      setSelectedPost(prev => ({...prev, likes: prev.likes + LIKE_COUNT_INCREMENT}));
    }

    // Send like request to backend
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Failed to like post:', error);
      // Revert UI change if request fails
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? {...post, likes: post.likes - LIKE_COUNT_INCREMENT} : post
        )
      );
    }
  };

  const bombardLikes = async (postId, setSelectedPost) => {
    // Send 1000 like requests to simulate high traffic
    try {
      await apiBombardLikes(postId, BOMBARD_LIKE_COUNT);
    } catch (error) {
      console.error('Failed to bombard likes:', error);
    }

    // Update like count in UI (adding 1000)
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? {...post, likes: post.likes + BOMBARD_LIKE_COUNT} : post
      )
    );

    // Update selected post if it's the same one
    if (setSelectedPost) {
      setSelectedPost(prev => ({...prev, likes: prev.likes + BOMBARD_LIKE_COUNT}));
    }
  };

  return { posts, handleLike, bombardLikes, setPosts };
};

export default useLike;