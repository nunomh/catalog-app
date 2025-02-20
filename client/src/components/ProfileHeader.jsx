import {
    Avatar,
    Box,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
    Text,
    VStack,
    useColorModeValue,
    useToast,
    Button,
} from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';

const ProfileHeader = ({ user }) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser._id));
    const showToast = useShowToast();
    const [updating, setUpdating] = useState(false);

    const copyUrl = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Link copied to clipboard',
                status: 'success',
            });
        });
    };

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast('Error', 'You must be logged in to follow users', 'error');
            return;
        }
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) {
                showToast('Error', data.error, 'error');
                return;
            }

            if (following) {
                showToast('Success', 'You have unfollowed ' + user.name, 'success');
                user.followers.pop(); // simulate removing from followers
            } else {
                showToast('Success', 'You have followed ' + user.name, 'success');
                user.followers.push(currentUser._id); // simulate adding to followers
            }

            setFollowing(!following);
        } catch (error) {
            showToast('Error', error, 'error');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <VStack alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>
                            @{user.username}
                        </Text>
                        <Text fontSize={'sm'}>·</Text>
                        <Text fontSize={'sm'}>{user.followers.length} followers</Text>
                    </Flex>
                    <Box mt={3}>
                        <Text>{user.bio}</Text>
                        <Link color={'gray.light'} href="https://instagram.com/todo" target="_blank">
                            instagram.com/todo
                        </Link>
                    </Box>
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar
                            name={user.name}
                            src={user.profilePic}
                            size={{
                                base: 'md',
                                md: 'xl',
                            }}
                        />
                    )}
                    {!user.profilePic && (
                        <Avatar
                            name={user.name}
                            src="https://bit.ly/broken-link"
                            size={{
                                base: 'md',
                                md: 'xl',
                            }}
                        />
                    )}
                </Box>
            </Flex>

            {currentUser._id === user._id && (
                <Link as={RouterLink} to={'/update'}>
                    <Button size={'sm'}>Edit profile</Button>
                </Link>
            )}

            {currentUser._id !== user._id && (
                <Button size={'sm'} onClick={handleFollowUnfollow} isLoading={updating}>
                    {following ? 'Unfollow' : 'Follow'}
                </Button>
            )}

            <Flex w={'full'} justifyContent={'space-between'}>
                <Box>
                    <Flex gap={2} alignItems={'center'}>
                        <Text color={'gray.light'}>61 books</Text>
                        <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                        <Text color={'gray.light'}>20 games</Text>
                        <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                        <Text color={'gray.light'}>12 movies</Text>
                        <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                        <Text color={'gray.light'}>2 TV series</Text>
                    </Flex>
                </Box>
                <Flex>
                    <Box className="icon-container">
                        <Link href="https://instagram.com/hylianthrone" target="_blank">
                            <BsInstagram size={24} cursor={'pointer'} />
                        </Link>
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={useColorModeValue('gray.200', 'gray.dark')}>
                                    <MenuItem bg={useColorModeValue('gray.200', 'gray.dark')} onClick={copyUrl}>
                                        Copy link
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
        </VStack>
    );
};

export default ProfileHeader;
