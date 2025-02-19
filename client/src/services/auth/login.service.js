export const loginUser = async inputs => {
    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            throw new Error(data.error || res.statusText);
        }

        return data; // Return user data if successful
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
