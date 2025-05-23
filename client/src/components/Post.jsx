import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import PostActions from './PostActions';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilValue, useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';

const Post = ({ post, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [posts, setPosts] = useRecoilState(postsAtom);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${postedBy}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast('Error', error.message, 'error');
                setUser(null);
            }
        };

        getUser();
    }, [postedBy]);

    const handleDeletePost = async e => {
        try {
            e.preventDefault();

            if (!window.confirm('Are you sure you want to delete this post?')) return;

            const res = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.error) {
                showToast('Error', data.error, 'error');
                return;
            }
            showToast('Success', 'Post deleted successfully', 'success');
            setPosts(prev => prev.filter(p => p._id !== post._id));
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    };

    if (!user) return null;

    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <Avatar
                        size={'md'}
                        name={user.username}
                        src={user.profilePic}
                        onClick={e => {
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}
                    />
                </Flex>
                <Flex flex={1} flexDirection={'column'} gap={2}>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Flex w={'full'} alignItems={'center'}>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                                onClick={e => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}
                            >
                                {user.username}
                            </Text>
                        </Flex>
                        <Flex gap={4} alignItems={'center'}>
                            <Text fontSize={'xs'} width={36} textAlign={'right'} color={'gray.light'}>
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>
                            <BsThreeDots />

                            {currentUser?._id === user._id && (
                                <DeleteIcon size={20} cursor={'pointer'} onClick={handleDeletePost} />
                            )}
                        </Flex>
                    </Flex>

                    <Text fontSize={'sm'}>{post.text}</Text>
                    {post.img && (
                        <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                            <Image src={post.img} w={'full'} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <PostActions post={post} />
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
