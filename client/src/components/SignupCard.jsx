import { User, Mail, Lock } from 'lucide-react';
import Input from './Input';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useColorMode } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import { signupUser } from '../services/auth/signup.service';

const SignUpPage = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
    });

    const showToast = useShowToast();

    const { colorMode } = useColorMode();
    const theme = useTheme();

    const criteria = [
        { label: 'At least 6 characters', met: inputs.password.length >= 6 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(inputs.password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(inputs.password) },
        { label: 'Contains a number', met: /\d/.test(inputs.password) },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(inputs.password) },
    ];

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isPasswordValid = criteria.every(criterion => criterion.met);
        setIsFormValid(inputs.username && inputs.name && inputs.email && isPasswordValid);
    }, [inputs.username, inputs.name, inputs.email, inputs.password]);

    const setUser = useSetRecoilState(userAtom);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            const userData = await signupUser(inputs);
            localStorage.setItem('user-data', JSON.stringify(userData));
            setUser(userData);
            showToast('Success', 'Account created successfully', 'success');
        } catch (error) {
            showToast('Error', error.message, 'error');
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
                    <h2 className="text-3xl font-bold mb-6 text-center ">Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Username"
                            onChange={e => setInputs({ ...inputs, username: e.target.value })}
                            value={inputs.username}
                        />
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Name"
                            onChange={e => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                        />
                        <Input
                            icon={Mail}
                            type="text"
                            placeholder="Email"
                            onChange={e => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            onChange={e => setInputs({ ...inputs, password: e.target.value })}
                            value={inputs.password}
                        />
                        {/* Password Strength Indicator */}
                        <PasswordStrengthMeter password={inputs.password} criteria={criteria} />
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
