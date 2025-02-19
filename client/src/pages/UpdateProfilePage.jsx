import { User, Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import { useState, useRef } from 'react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useColorMode, useTheme, Button, Stack, Avatar, Center } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import { updateProfile } from '../services/user/updateUser.service';

const UpdateProfilePage = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const fileRef = useRef(null);
    const showToast = useShowToast();
    const { colorMode } = useColorMode();
    const theme = useTheme();
    const { handleImageChange, imgUrl } = usePreviewImg();

    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: '',
    });

    const criteria = [
        { label: 'At least 6 characters', met: inputs.password.length >= 6 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(inputs.password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(inputs.password) },
        { label: 'Contains a number', met: /\d/.test(inputs.password) },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(inputs.password) },
    ];

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const updatedUserData = await updateProfile(user._id, { ...inputs, profilePic: imgUrl });
            showToast('Success', 'Profile updated successfully', 'success');
            setUser(updatedUserData);
            localStorage.setItem('user-catalog', JSON.stringify(updatedUserData));
        } catch (error) {
            showToast('Error', error.message || 'Profile update failed', 'error');
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
                    <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={['column', 'row']} spacing={6} mb={6}>
                            <Center>
                                <Avatar size="xl" src={imgUrl || user.profilePic} />
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()}>
                                    Change Profile Picture
                                </Button>
                                <input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
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
                            icon={Mail}
                            type="text"
                            placeholder="Bio"
                            onChange={e => setInputs({ ...inputs, bio: e.target.value })}
                            value={inputs.bio}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            onChange={e => setInputs({ ...inputs, password: e.target.value })}
                            value={inputs.password}
                        />
                        {/* Password Strength Indicator */}
                        {inputs.password && <PasswordStrengthMeter password={inputs.password} criteria={criteria} />}
                        <button
                            className="mt-5 w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg transition duration-200 bg-blue-400 hover:bg-blue-500"
                            type="submit"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;
