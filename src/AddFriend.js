import React, { useState } from 'react';
import { searchUsers, addFriend } from './services/api';

const AddFriend = ({ friends, setFriends, currentUserId }) => {
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await searchUsers(name);
            setSearchResults(response.users);
        } catch (error) {
            console.error('Error searching users:', error);
            alert('Failed to search users. Please try again.');
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            const response = await addFriend({ user_id: currentUserId, friend_id: friendId });
            if (response.status === 'success') {
                const newFriend = { id: friendId, name: name };
                setFriends([...friends, newFriend]);
                setName('');
                setSearchResults([]);
                alert('Friend added successfully');
            } else {
                throw new Error(response.error || 'Failed to add friend');
            }
        } catch (error) {
            console.error('Error adding friend:', error);
            alert('Failed to add friend. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">Add Friend</h2>
            <div className="p-4">
                <div className="flex items-center border-b border-gray-300 pb-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Search for users"
                        className="bg-gray-100 border-2 border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
                <ul className="mt-4">
                    {searchResults.map((user) => (
                        <li key={user.id} className="flex items-center justify-between py-2 border-b border-gray-300">
                            <span>{user.username}</span>
                            <button
                                onClick={() => handleAddFriend(user.id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddFriend;
