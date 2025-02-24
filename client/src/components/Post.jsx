import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import PostActions from './PostActions';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();

    const navigate = useNavigate();

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
