import React, { useState } from 'react';

const AddPost = ({ setPosts, currentUserId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://socialm.rf.gd/backend/add_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies are sent
                body: JSON.stringify({ user_id: currentUserId, content })
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            if (data.status === 'success') {
                setPosts(prevPosts => [...prevPosts, {
                    id: data.post_id,
                    user_id: currentUserId,
                    content,
                    created_at: new Date().toISOString()
                }]);
                alert('Post created successfully');
                setContent('');
            } else {
                throw new Error(data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">Add New Post</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post..."
                    rows={4}
                    required
                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <br />
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
