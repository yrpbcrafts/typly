import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Calendar, User, MoreHorizontal, TrendingUp, Clock, Bookmark } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar?: string;
    isVerified?: boolean;
  };
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  category: string;
  images?: string[];
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      isVerified: true,
    },
    title: 'The Future of Web Development',
    content: 'Just finished exploring the latest React 19 features and I\'m blown away! The new concurrent features and server components are game-changers. The developer experience keeps getting better and better. What are your thoughts on the direction React is heading?',
    createdAt: '2025-07-20T08:30:00Z',
    likes: 234,
    comments: 42,
    shares: 18,
    isLiked: false,
    isBookmarked: false,
    category: 'Technology'
  },
  {
    id: 2,
    author: {
      name: 'Marcus Johnson',
      username: 'mjohnson',
    },
    title: 'Morning Coffee Thoughts',
    content: 'There\'s something magical about the first cup of coffee in the morning. It\'s not just about the caffeine—it\'s that moment of pause before the day begins. A ritual that grounds us and prepares us for whatever lies ahead. ☕️✨',
    createdAt: '2025-07-20T07:15:00Z',
    likes: 156,
    comments: 28,
    shares: 12,
    isLiked: true,
    isBookmarked: true,
    category: 'Lifestyle'
  },
  {
    id: 3,
    author: {
      name: 'Alex Rivera',
      username: 'alexr',
      isVerified: true,
    },
    title: 'Weekend Project Success!',
    content: 'Finally completed my home automation project using Node.js and Raspberry Pi. Now I can control my lights, temperature, and security system from anywhere. The satisfaction of seeing your code control the physical world is unmatched! 🏠🤖',
    createdAt: '2025-07-19T20:45:00Z',
    likes: 387,
    comments: 65,
    shares: 34,
    isLiked: false,
    isBookmarked: false,
    category: 'DIY'
  },
  {
    id: 4,
    author: {
      name: 'Emma Wilson',
      username: 'emmaw',
    },
    title: 'Design Inspiration',
    content: 'Visited the new modern art museum downtown today. The way they use negative space and minimalist design principles is absolutely stunning. It\'s amazing how simplicity can be so powerful and emotionally moving.',
    createdAt: '2025-07-19T16:20:00Z',
    likes: 198,
    comments: 31,
    shares: 22,
    isLiked: true,
    isBookmarked: false,
    category: 'Design'
  },
  {
    id: 5,
    author: {
      name: 'David Park',
      username: 'dpark',
    },
    title: 'Learning Never Stops',
    content: 'Started learning TypeScript this week and I\'m already seeing the benefits. The type safety and better IDE support make such a difference in larger projects. If you\'re still on the fence about TypeScript, I highly recommend giving it a try!',
    createdAt: '2025-07-19T14:10:00Z',
    likes: 267,
    comments: 48,
    shares: 29,
    isLiked: false,
    isBookmarked: true,
    category: 'Learning'
  }
];

const categories = ['All', 'Technology', 'Lifestyle', 'DIY', 'Design', 'Learning'];

export const Newsfeed = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('Technology');

  const [newImages, setNewImages] = useState<string[]>([]);

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

  const handleBookmark = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);


const handleCreatePost = () => {

    if (!user){
        alert("Please login to create a post.");
      navigate("/login");
    }else{
       const newPost: Post = {
        id: posts.length + 1,
        author: {
        name: 'You',
        username: 'you',
        },
        title: newTitle,
        content: newContent,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        category: newCategory,
        images: newImages,
    };

    setPosts([newPost, ...posts]);
    setShowModal(false);
    setNewTitle('');
    setNewContent('');
    setNewImage(null);
    setNewCategory('Technology');
    setNewImages([]);   
    }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Newsfeed</h1>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Live updates</span>
            </div>
          </div>
          
          
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          
        </div>
      </div>


      <div className={`p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        <div className="text-right mb-6 max-w-4xl mx-auto">
            <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-all"
            >
                + Create Post
            </button>
        </div>


        
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Post header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">
                        {getInitials(post.author.name)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        {post.author.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>@{post.author.username}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(post.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <button className="p-2 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-700 leading-relaxed text-[15px] mb-4">
                  {post.content}
                </p>

                {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 rounded-lg overflow-hidden">
                        {post.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Post image ${idx}`}
                            className="rounded-lg object-cover w-full aspect-square border border-gray-100"
                        />
                        ))}
                    </div>
                )}
              </div>

              {/* Post actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        post.isLiked
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-green-600 transition-all duration-200">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      post.isBookmarked
                        ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-yellow-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Load more */}
          <div className="text-center pt-8">
            <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
              Load More Posts
            </button>
          </div>
        </div>
      </div>

{showModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl w-full max-w-lg p-6 shadow-xl relative border border-gray-200 dark:border-neutral-700">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
      >
        ✕
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Create New Post
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <textarea
          placeholder="What's on your mind?"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-neutral-800 text-gray-800 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {categories
            .filter((c) => c !== 'All')
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        <div className="grid grid-cols-3 gap-4">
        {newImages.map((img, idx) => (
            <div key={idx} className="relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <img src={img} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
            </div>
        ))}

        <label className="relative flex items-center justify-center aspect-square border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
            <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImages([...newImages, reader.result as string]);
                };
                reader.readAsDataURL(file);
                }
            }}
            />
            <span className="text-3xl text-blue-500 dark:text-blue-400">+</span>
        </label>
        </div>


        <button
          onClick={handleCreatePost}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
        >
          Post
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};