import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/theme-utils';
import { ColorModeScript } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
const styles = {
    global: props => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.100', '#101010')(props),
        },
    }),
};

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
};

const colors = {
    gray: {
        light: '#616161',
        dark: '#1e1e1e',
    },
};

const theme = extendTheme({ config, styles, colors });

createRoot(document.getElementById('root')).render(
    // StrictMode is a tool for highlighting potential problems in an application, renders every component twice on development
    <StrictMode>
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
            </ChakraProvider>
        </RecoilRoot>
    </StrictMode>
);
