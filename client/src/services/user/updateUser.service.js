export const updateProfile = async (userId, updatedData) => {
    try {
        const res = await fetch(`/api/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            throw new Error(data.error || res.statusText);
        }

        return data; // Return updated user data if successful
    } catch (error) {
        console.error('Update Profile Error:', error);
        throw error;
    }
};
