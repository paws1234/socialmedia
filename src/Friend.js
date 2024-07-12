import React, { useState } from 'react';
import { addFriend } from './services/api';

const Friend = () => {
    const [friendId, setFriendId] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addFriend({ user_id: user.id, friend_id: friendId });
        if (response.status === 'success') {
            alert('Friend added successfully');
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">Add Friend</h2>
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={friendId}
                            onChange={(e) => setFriendId(e.target.value)}
                            placeholder="Friend ID"
                            required
                            className="bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Friend
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Friend;
