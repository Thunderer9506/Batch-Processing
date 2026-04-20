import React, { useState, useEffect } from 'react';

const PostGrid = ({ posts: initialPosts, onPostClick }) => {
  // 1. Store the posts in local state so we can update their like counts
  const [posts, setPosts] = useState(initialPosts);

  // 2. If the parent component passes down an entirely new set of posts 
  // (e.g., the user refreshes or changes pages), resync our local state.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // 3. The 5-second Polling Logic
  useEffect(() => {
    const fetchLiveLikes = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts/likes');
        
        if (response.ok) {
          const liveLikesData = await response.json();
          
          setPosts((currentPosts) =>
            currentPosts.map((post) => {
              // Find the matching post from the backend response
              const liveUpdate = liveLikesData.find((p) => p.id === post.id);
              
              // If found, update the 'likes' property. 
              // Note: We map your backend's 'like_count' to this component's 'likes' property.
              return liveUpdate ? { ...post, likes: liveUpdate.like_count } : post;
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch live likes:", error);
      }
    };

    // Set up the interval to run every 5000ms (5 seconds)
    const intervalId = setInterval(fetchLiveLikes, 5000);

    // Cleanup: clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer transform hover:scale-105"
          onClick={() => onPostClick(post)}
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
  );
};

export default PostGrid;