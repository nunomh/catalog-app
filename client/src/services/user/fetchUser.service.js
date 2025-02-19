export const fetchUser = async (username, showToast) => {
    try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
            showToast('Error', data.error, 'error');
            return null;
        }
        return data;
    } catch (error) {
        showToast('Error', error.message || 'Something went wrong', 'error');
        return null;
    }
};
