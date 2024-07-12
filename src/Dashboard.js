import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import FriendList from './FriendList';
import AddFriend from './AddFriend';
import PostList from './PostList';
import AddPost from './AddPost';

const Dashboard = () => {
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from storage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if user details are not found
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear user details from storage on logout
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Your Logo or Branding */}
                                <span className="font-bold text-xl">Social Media</span>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/dashboard/friends" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Friends</Link>
                                    <Link to="/dashboard/add-friend" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Add Friend</Link>
                                    <Link to="/dashboard/posts" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Posts</Link>
                                    <Link to="/dashboard/add-post" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Add Post</Link>
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        </div>
                    </nav>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/friends" element={<FriendList currentUserId={user ? user.id : null} />} />
                    <Route path="/add-friend" element={<AddFriend friends={friends} setFriends={setFriends} currentUserId={user ? user.id : null} />} />
                    <Route path="/posts" element={<PostList posts={posts} currentUserId={user ? user.id : null} />} />
                    <Route path="/add-post" element={<AddPost setPosts={setPosts} currentUserId={user ? user.id : null} />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
