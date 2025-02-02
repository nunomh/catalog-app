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
} from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';

const ProfileHeader = () => {
    const toast = useToast();
    const copyUrl = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Link copied to clipboard',
                status: 'success',
            });
        });
    };

    return (
        <VStack alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        Hylianthrone 🕹️
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>
                            @hylianthrone
                        </Text>
                        <Text fontSize={'sm'}>·</Text>
                        <Text fontSize={'sm'}>2 followers</Text>
                    </Flex>
                    <Box mt={3}>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</Text>
                        <Link color={'gray.light'} href="https://instagram.com/hylianthrone" target="_blank">
                            instagram.com/hylianthrone
                        </Link>
                    </Box>
                </Box>
                <Box>
                    <Avatar
                        name="hylianthrone"
                        src="/hylianthrone.png"
                        size={{
                            base: 'md',
                            md: 'xl',
                        }}
                    />
                </Box>
            </Flex>

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
