import { useState, useEffect } from 'react';
import Input from './Input';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';

const LoginPage = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    const { colorMode } = useColorMode();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = e => {
        e.preventDefault();
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(email && password);
    }, [email, password]);

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
                    <form onSubmit={handleLogin}>
                        <Input
                            icon={Mail}
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="flex items-center justify-end mb-2">
                            <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            className={`mt-5 w-full py-3 px-4 text-white 
						font-bold rounded-lg shadow-lg transition duration-200
						${isFormValid ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            onClick={() => setIsLoading(true)}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : 'Login'}
                        </button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-blue-500 bg-opacity-50 flex justify-center">
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
