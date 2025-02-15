import { User, Mail, Lock } from 'lucide-react';
import Input from './Input';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useColorMode } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';

const SignUpPage = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    const { colorMode } = useColorMode();
    const theme = useTheme();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const criteria = [
        { label: 'At least 6 characters', met: password.length >= 6 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
        { label: 'Contains a number', met: /\d/.test(password) },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
    ];

    const handleSubmit = e => {
        e.preventDefault();
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isPasswordValid = criteria.every(criterion => criterion.met);
        setIsFormValid(name && email && isPasswordValid);
    }, [name, email, password]);

    return (
        <div className="flex items-center justify-center relative overflow-hidden py-4">
            <div
                className="max-w-md w-full rounded-2xl shadow-xl overflow-hidden"
                style={{
                    backgroundColor: colorMode === 'dark' ? theme.colors.gray.dark : theme.colors.white,
                }}
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center ">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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
                        {/* Password Strength Indicator */}
                        <PasswordStrengthMeter password={password} criteria={criteria} />
                        <button
                            className={`mt-5 w-full py-3 px-4 text-white 
						font-bold rounded-lg shadow-lg transition duration-200
						${isFormValid ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-blue-500 bg-opacity-50 flex justify-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link className=" hover:underline" onClick={() => setAuthScreen('login')}>
                            <b>Login</b>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
