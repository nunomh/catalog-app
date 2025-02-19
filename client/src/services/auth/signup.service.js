export const signupUser = async inputs => {
    try {
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        });

        const data = await res.json();

        if (data.error || !res.ok) {
            throw new Error(data.error || res.statusText);
        }

        return data; // Return user data if successful
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
};
