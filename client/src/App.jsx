import { Container } from '@chakra-ui/react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
// import LogoutButton from './components/LogoutButton';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePostButton from './components/CreatePostButton';

function App() {
    const user = useRecoilValue(userAtom);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />

                <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/" />} />

                <Route path="/:username" element={<ProfilePage />} />
                <Route path="/:username/post/:pid" element={<PostPage />} />
            </Route>
        )
    );

    return (
        <Container maxW="820px">
            <RouterProvider router={router} />
            {/* {user && <LogoutButton />} */}
            {user && <CreatePostButton />}
        </Container>
    );
}

export default App;
