// API utility functions

// Base URL for the backend API. Use HTTPS and allow overriding via environment variable.
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://localhost:8000';

export const fetchPosts = async () => {
  // In a real app, you would fetch from your backend API
  const response = await fetch(`${API_BASE}/posts`);
  const rawData = await response.json();
  console.log('Fetched posts:', rawData);

  // Process the raw data as needed
  const posts = rawData.map(post => ({
    id: post.id,
    imageUrl: post.image_url,
    caption: post.caption,
    likes: post.like_count,
  }));

  return posts;

  // Mock data for demonstration
  // return [
  //   {
  //     id: 1,
  //     imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Beautiful sunset drive through the mountains 🌅 #carlife #mountainroads',
  //     likes: 245,
  //   },
  //   // ... other mock posts ...
  // ];
};

export const likePost = async (postId) => {
  // In a real app, you would send a request to your backend API
  const safePostId = encodeURIComponent(postId);
  const response = await fetch(`${API_BASE}/posts/${safePostId}/like`, { method: 'POST' });
  console.log(`Liked post ${postId}`);

  return response.json();

  // return { success: true };
};

export const bombardLikes = async (postId, count = 1001) => {
  // In a real app, you would send multiple requests to your backend API
  console.log(`Bombarding post ${postId} with ${count} likes...`);

  // Simulate the requests
  for (let i = 0; i < count; i++) {
    // Simulate API request
    await likePost(postId);

    // Add a small delay to prevent freezing the UI
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  }

  console.log(`Finished bombarding post ${postId} with ${count} likes`);
  return { success: true };
};