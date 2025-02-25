import ProfileHeader from '../components/ProfileHeader';
import UserPost from '../components/UserPost';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useShowToastWithCallback from '../hooks/useShowToastWithCallback';
import { fetchUser } from '../services/user/fetchUser.service';
import { Flex, Spinner } from '@chakra-ui/react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const showToast = useShowToastWithCallback();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const userData = await fetchUser(username, showToast);
            if (userData) setUser(userData);
            setLoading(false);
        };
        getUser();

        const getPosts = async () => {};
    }, [username]);

    if (!user && loading)
        return (
            <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'xl'} />
            </Flex>
        );
    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            <ProfileHeader user={user} />
        </>
    );
};

export default ProfilePage;
