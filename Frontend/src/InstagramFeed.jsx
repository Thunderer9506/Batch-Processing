import { useState, useEffect } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Beautiful sunset drive through the mountains 🌅 #carlife #mountainroads',
      likes: 245,
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1543672343-5b3ceb0a0013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Classic beauty restored to perfection ✨ #classiccar #restoration',
      likes: 189,
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1544003484-3cd7bfa514f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Weekend racing vibes 🏁 #racing #speed',
      likes: 321,
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53b200c8f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Luxury redefined 🏎️ #luxurycar #supercars',
      likes: 456,
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1544077880-ef7a0f2a0fb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Offroad adventures await ⛰️ #offroad #adventure',
      likes: 278,
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Electric future is here 🔋 #electriccars #futuretech',
      likes: 389,
    },
  ];

  // Simulate fetching posts from backend
  useEffect(() => {
    // In a real app, you would fetch from your backend API
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const handleLike = async (postId) => {
    // Update UI immediately for better UX
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? {...post, likes: post.likes + 1} : post
      )
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({...prev, likes: prev.likes + 1}));
    }

    // Send like request to backend (in a real app)
    try {
      // Replace with your actual API endpoint
      // await fetch('/api/posts/' + postId + '/like', { method: 'POST' });
      console.log(`Liked post ${postId}`);
    } catch (error) {
      console.error('Failed to like post:', error);
      // Revert UI change if request fails
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? {...post, likes: post.likes - 1} : post
        )
      );
    }
  };

  const bombardLikes = async (postId) => {
    // Send 1000 like requests to simulate high traffic
    console.log(`Bombarding post ${postId} with 1000 likes...`);

    // In a real scenario, you would send these requests to your backend
    // Here we're simulating the requests with a loop
    for (let i = 0; i < 1000; i++) {
      // Simulate API request
      // await fetch('/api/posts/' + postId + '/like', { method: 'POST' });

      // Add a small delay to prevent freezing the UI
      if (i % 100 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    }

    console.log(`Finished bombarding post ${postId} with 1000 likes`);

    // Update like count in UI (adding 1000)
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? {...post, likes: post.likes + 1000} : post
      )
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({...prev, likes: prev.likes + 1000}));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Carstagram
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
              Add Post
            </button>
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer transform hover:scale-105"
              onClick={() => openPost(post)}
            >
              <div className="relative pb-[100%]"> {/* Square container */}
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{post.likes} likes</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {post.caption.length > 100 ? post.caption.substring(0, 100) + '...' : post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-2/3 relative">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.caption}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
                <button
                  onClick={closePost}
                  className="absolute top-4 right-4 bg-gray-900 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Details */}
              <div className="md:w-1/3 p-6 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">Post Details</h2>
                  <p className="text-gray-300 mb-4">{selectedPost.caption}</p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-bold">{selectedPost.likes} likes</span>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => handleLike(selectedPost.id)}
                      className="flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>Like</span>
                    </button>

                    <button
                      onClick={() => bombardLikes(selectedPost.id)}
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.816-.66 1.748-.876 2.792a15.671 15.671 0 00-.548 3.296c-.058.62-.114 1.28-.162 1.98-.048.7-.084 1.44-.1 2.21l-.001.2c-.002.38-.003.78-.003 1.22 0 .44.001.84.003 1.22l.001.2c.016.77.052 1.51.1 2.21.048.7.104 1.36.162 1.98.12.97.27 1.91.45 2.81.18.9.39 1.75.63 2.55.24.8.52 1.54.84 2.21.32.67.68 1.28 1.08 1.82.4.54.84.99 1.31 1.36.47.37.97.67 1.49.89.52.22 1.07.37 1.63.45.56.08 1.13.1 1.7.06.57-.04 1.14-.12 1.7-.25.56-.13 1.11-.31 1.64-.54.53-.23 1.04-.52 1.52-.86.48-.34.93-.74 1.34-1.19.41-.45.78-.95 1.1-1.5.32-.55.6-.11.84-.77.24-.66.44-1.36.6-2.09.16-.73.28-1.49.36-2.27.08-.78.12-1.58.13-2.39.01-.81 0-1.63-.03-2.45-.03-.82-.09-1.64-.18-2.45-.09-.81-.22-1.61-.39-2.4-.17-.79-.38-1.56-.63-2.31-.25-.75-.54-1.48-.87-2.18-.33-.7-.7-1.37-1.11-1.99-.41-.62-.86-1.2-1.34-1.73-.48-.53-1-.99-1.54-1.4-.54-.41-1.11-.76-1.7-.99-.59-.23-1.19-.4-1.8-.5-.61-.1-1.23-.15-1.85-.15-.62 0-1.24.05-1.85.15-.61.1-1.21.27-1.8.5-.59.23-1.16.58-1.7 1.09z" clipRule="evenodd" />
                      </svg>
                      <span>Bombard Likes (1000)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;