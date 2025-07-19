import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user-store';
import { Heart, MessageCircle, Share2, Calendar, Mail, User, MoreHorizontal } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    content: 'Just joined this awesome platform! Ready to connect and share amazing content with everyone. This journey is going to be incredible! 🚀',
    createdAt: '2025-07-15',
    likes: 42,
    comments: 8,
    isLiked: false,
  },
  {
    id: 2,
    title: 'What I learned today',
    content: 'Today I explored Zustand for state management. It\'s super lightweight and easy to use! The developer experience is fantastic and it integrates seamlessly with React. Highly recommend it to anyone looking for a simpler alternative to Redux.',
    createdAt: '2025-07-18',
    likes: 73,
    comments: 15,
    isLiked: true,
  },
  {
    id: 3,
    title: 'Weekend Vibes',
    content: 'Spent the weekend working on some exciting side projects. There\'s nothing quite like the satisfaction of seeing your code come to life! What are you all working on?',
    createdAt: '2025-07-19',
    likes: 28,
    comments: 6,
    isLiked: false,
  },
];

export const Profile = () => {
  const user = useUserStore((state) => state.user);
  const [posts, setPosts] = useState(mockPosts);
  const [isVisible, setIsVisible] = useState(false);
const isFileOrBlob = (value: unknown): value is File | Blob =>
  value instanceof File || value instanceof Blob;
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg">No user is currently logged in.</p>
          <div className="w-32 h-1 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg">
{user.profileImage ? (
  isFileOrBlob(user.profileImage) ? (
    <img
      src={URL.createObjectURL(user.profileImage)}
      alt="Profile"
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <img
      src={user.profileImage}
      alt="Profile"
      className="w-full h-full rounded-full object-cover"
    />
  )
) : (
  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
    <span className="text-3xl font-bold text-white">
      {user.firstName?.[0]?.toUpperCase()}
      {user.lastName?.[0]?.toUpperCase()}
    </span>
  </div>
)}

                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {user.firstName} {user.middleName} {user.lastName}
                </h1>
                <p className="text-gray-600 text-lg mb-4">@{user.username}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2 text-gray-700 justify-center md:justify-start">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 justify-center md:justify-start">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {user.dob}
                  </div>
                </div>

                <div className="flex gap-8 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1.2k</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">856</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Timeline</h2>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        post.isLiked
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'hover:bg-gray-50 text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-all duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-green-600 transition-all duration-200">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
              Load More Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};