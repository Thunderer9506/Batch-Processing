import { useState, useEffect } from 'react';
import PostGrid from './PostGrid';
import PostModal from './PostModal';
import useLike from '../../hooks/useLike';
import { fetchPosts } from '../../utils/api';
import { APP_NAME } from '../../constants/app';

const InstagramFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { posts, handleLike, bombardLikes, setPosts } = useLike([]);

  // Fetch posts from backend
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
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
      <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {APP_NAME}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
              Add Post
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <PostGrid posts={posts} onPostClick={openPost} />
      </main>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={closePost}
          onLike={(postId) => handleLike(postId, setSelectedPost)}
          onBombardLikes={(postId) => bombardLikes(postId, setSelectedPost)}
        />
      )}
    </div>
  );
};

export default InstagramFeed;