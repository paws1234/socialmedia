import React, { useState, useEffect } from 'react';

const PostList = ({ currentUserId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost/Project/Social-Media/backend/PostList.php?user_id=${currentUserId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                if (data.status === 'success') {
                    setPosts(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentUserId]);

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">Post List</h2>
            <ul>
                {posts.length === 0 ? (
                    <p className="p-4 text-center">No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <li key={post.id} className="border-b border-gray-300">
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-700">{post.content}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PostList;
