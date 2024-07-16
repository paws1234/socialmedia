import React, { useEffect, useState } from 'react';

const FriendList = ({ currentUserId }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUserId) {
            fetchFriends(currentUserId);
        }
    }, [currentUserId]);

    const fetchFriends = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching friends for userId:', userId);
            const response = await fetch(`https://jjovershop.000webhostapp.com/friend_list.php?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }
            const data = await response.json();
            console.log('Fetch response:', data);
            if (data.status === 'success') {
                setFriends(data.friends);
            } else {
                throw new Error(data.message || 'Failed to fetch friends');
            }
        } catch (error) {
            console.error('Error fetching friends:', error);
            setError(error.message || 'Failed to fetch friends');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-4">Loading friends...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-4">Error fetching friends: {error}</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="bg-blue-500 text-white text-center py-2">Friends List</h2>
            <div className="p-4">
                {friends.length === 0 ? (
                    <p className="text-center">No friends found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {friends.map((friend, index) => (
                            <li key={index} className="py-2">{friend.friend_username}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FriendList;
