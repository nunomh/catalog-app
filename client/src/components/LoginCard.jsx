import { useState, useEffect } from 'react';
import Input from './Input';
import { User, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { useTheme, Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import { loginUser } from '../services/auth/login.service';

const LoginPage = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    const { colorMode } = useColorMode();
    const theme = useTheme();

    const [isFormValid, setIsFormValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        setIsFormValid(inputs.username && inputs.password);
    }, [inputs.username, inputs.password]);

    const showToast = useShowToast();

    const setUser = useSetRecoilState(userAtom);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            const userData = await loginUser(inputs);
            localStorage.setItem('user-catalog', JSON.stringify(userData));
            setUser(userData);
            showToast('Success', 'Login successful!', 'success');
        } catch (error) {
            showToast('Error', error.message || 'Login failed', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center relative overflow-hidden py-4">
            <div
                className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden"
                style={{
                    backgroundColor: colorMode === 'dark' ? theme.colors.gray.dark : theme.colors.white,
                }}
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Username"
                            value={inputs.username}
                            onChange={e => setInputs({ ...inputs, username: e.target.value })}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={e => setInputs({ ...inputs, password: e.target.value })}
                        />
                        <div className="flex items-center justify-end mb-2">
                            <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            mt={5}
                            w="full"
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Logging in..."
                            isDisabled={!isFormValid}
                            colorScheme="blue"
                            variant="solid"
                        >
                            Login
                        </Button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-blue-400 bg-opacity-50 flex justify-center">
                    <p className="text-sm">
                        Don&apos;t have an account?{' '}
                        <Link className=" hover:underline" onClick={() => setAuthScreen('signup')}>
                            <b>Sign Up</b>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
