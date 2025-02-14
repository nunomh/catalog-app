import { useColorMode, useTheme } from '@chakra-ui/react';

const Input = ({ icon: Icon, type, ...props }) => {
    const { colorMode } = useColorMode();
    const theme = useTheme();

    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {Icon && <Icon className="size-5 text-gray-500" />}
            </div>
            <input
                {...props}
                type={type}
                style={{
                    backgroundColor: colorMode === 'dark' ? theme.colors.gray.dark : theme.colors.white,
                    color: type === 'password' ? 'gray' : 'black', // Ensures password dots are gray
                }}
                className="w-full pl-10 pr-3 py-2 bg-opacity-50 rounded-lg border border-gray-400 placeholder-gray-500"
            />
        </div>
    );
};

export default Input;
