const API_URL = 'http://socialm.rf.gd/backend';

export const register = async (user) => {
    const response = await fetch(`${API_URL}/register.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const login = async (user) => {
    const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const addPost = async (post) => {
    const response = await fetch(`${API_URL}/add_post.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return response.json();
};


export const searchUsers = async (name) => {
    try {
        const response = await fetch(`http://localhost/Project/Social-Media/backend/search_users.php?name=${name}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error searching users: ${error.message}`);
    }
};

export const addFriend = async (friend) => {
    const response = await fetch(`${API_URL}/add_friend.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(friend),
    });
    return response.json();
};
