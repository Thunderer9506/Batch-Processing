// API utility functions

export const fetchPosts = async () => {
  // In a real app, you would fetch from your backend API
  const response = await fetch('http://localhost:8000/posts');
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
  //   {
  //     id: 2,
  //     imageUrl: 'https://images.unsplash.com/photo-1543672343-5b3ceb0a0013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Classic beauty restored to perfection ✨ #classiccar #restoration',
  //     likes: 189,
  //   },
  //   {
  //     id: 3,
  //     imageUrl: 'https://images.unsplash.com/photo-1544003484-3cd7bfa514f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Weekend racing vibes 🏁 #racing #speed',
  //     likes: 321,
  //   },
  //   {
  //     id: 4,
  //     imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53b200c8f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Luxury redefined 🏎️ #luxurycar #supercars',
  //     likes: 456,
  //   },
  //   {
  //     id: 5,
  //     imageUrl: 'https://images.unsplash.com/photo-1544077880-ef7a0f2a0fb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Offroad adventures await ⛰️ #offroad #adventure',
  //     likes: 278,
  //   },
  //   {
  //     id: 6,
  //     imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  //     caption: 'Electric future is here 🔋 #electriccars #futuretech',
  //     likes: 389,
  //   },
  // ];
};

export const likePost = async (postId) => {
  // In a real app, you would send a request to your backend API
  const response = await fetch(`http://localhost:8000/posts/${postId}/like`, { method: 'POST' });
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