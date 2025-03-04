import ProfileHeader from '../components/ProfileHeader';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useShowToastWithCallback from '../hooks/useShowToastWithCallback';
// import { fetchUser } from '../services/user/fetchUser.service';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

const ProfilePage = () => {
    const { loading, user } = useGetUserProfile();

    const { username } = useParams();
    const showToast = useShowToastWithCallback();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            setLoadingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast('Error', error, 'error');
                setPosts([]);
            } finally {
                setLoadingPosts(false);
            }
        };
        getPosts();
    }, [username, setPosts]);

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

            {!loadingPosts && posts.length === 0 && <h1>User has no posts</h1>}

            {loadingPosts && (
                <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}

            {posts.map(post => (
                <Post post={post} key={post._id} postedBy={post.postedBy} />
            ))}
        </>
    );
};

export default ProfilePage;
