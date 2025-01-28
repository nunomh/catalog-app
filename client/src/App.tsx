import { ColorModeButton } from './components/ui/color-mode';
import { Box, Text } from '@chakra-ui/react';

function App() {
    return (
        <>
            <ColorModeButton />
            <Box bg={{ base: 'yellow', _dark: 'red' }}>
                <Text>Hello</Text>
            </Box>
        </>
    );
}

export default App;
