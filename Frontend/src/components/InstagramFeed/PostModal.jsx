import React, { useState, useEffect } from 'react';

const PostModal = ({ post, onClose, onLike, onBombardLikes }) => {
  const [liveLikes, setLiveLikes] = useState(post.likes);

  useEffect(() => {
    setLiveLikes(post.likes);
  }, [post.likes]);

  useEffect(() => {
    const fetchLiveLikes = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts/likes');

        if (response.ok) {
          const liveLikesData = await response.json();
          console.log('Fetched live likes for modal:', liveLikesData);

          const liveUpdate = liveLikesData.find((p) => p.id === post.id);

          if (liveUpdate) {
            setLiveLikes(liveUpdate.like_count);
          }
        }
      } catch (error) {
        console.error("Failed to fetch live likes:", error);
      }
    };

    const intervalId = setInterval(fetchLiveLikes, 5000);
    return () => clearInterval(intervalId);
  }, [post.id]);

  const handleLikeClick = () => {
    setLiveLikes(prev => prev + 1);
    onLike(post.id);
  };

  const handleBombardClick = () => {
    setLiveLikes(prev => prev + 1000);
    onBombardLikes(post.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 relative">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-contain max-h-[70vh]"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-900 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="md:w-1/3 p-6 flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Post Details</h2>
              <p className="text-gray-300 mb-4">{post.caption}</p>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold">{liveLikes} likes</span>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleLikeClick}
                  className="flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-lg transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>Like</span>
                </button>

                <button
                  onClick={handleBombardClick}
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
  );
};

export default PostModal;