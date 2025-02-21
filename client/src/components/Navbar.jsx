import { Flex, useColorMode, Link } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useRecoilValue(userAtom);

    return (
        <Flex justifyContent="space-between" mt={6} mb={12}>
            {user && (
                <Link as={RouterLink} to="/">
                    <AiFillHome size={24} />
                </Link>
            )}

            {colorMode === 'dark' && (
                <LuMoon cursor="pointer" size={24} alt="light mode" onClick={toggleColorMode} title="Turn on lights" />
            )}
            {colorMode === 'light' && (
                <LuSun cursor="pointer" size={24} alt="dark mode" onClick={toggleColorMode} title="Turn off lights" />
            )}

            {user && (
                <Link as={RouterLink} to={`/${user.username}`}>
                    <RxAvatar size={24} />
                </Link>
            )}
        </Flex>
    );
};

export default Navbar;
