import { User, Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="max-w-md w-full bg-gray-200 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">Create Account</h2>
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
                        {/* <PasswordStrengthMeter password={password} /> */}
                        <button
                            className="mt-5 w-full py-3 px-4 bg-gray-500 text-white 
						font-bold rounded-lg shadow-lg hover:bg-gray-600
						focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-700 bg-opacity-50 flex justify-center">
                    <p className="text-sm text-gray-200">
                        Already have an account?{' '}
                        <Link className="text-gray-200 hover:underline" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
