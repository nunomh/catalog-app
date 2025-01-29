import { Flex, useColorMode } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex justifyContent="center" mt={6} mb={6}>
            {colorMode === 'dark' && (
                <LuSun cursor="pointer" size={24} alt="light mode" onClick={toggleColorMode} title="Turn on lights" />
            )}
            {colorMode === 'light' && (
                <LuMoon cursor="pointer" size={24} alt="dark mode" onClick={toggleColorMode} title="Turn off lights" />
            )}
        </Flex>
    );
};

export default Navbar;
