const PostGrid = ({ posts, onPostClick }) => {
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