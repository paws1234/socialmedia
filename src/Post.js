import React, { useState } from 'react';
import { addPost } from './services/api';

const Post = () => {
    const [content, setContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addPost({ user_id: user.id, content });
        if (response.status === 'success') {
            alert('Post added successfully');
            setContent(''); // Clear the content after successful post
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">New Post</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4} 
                />
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

export default Post;
