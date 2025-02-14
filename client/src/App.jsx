import { Container } from '@chakra-ui/react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/user/:username" element={<ProfilePage />} />
                <Route path="/user/:username/post/:pid" element={<PostPage />} />
            </Route>
        )
    );

    return (
        <Container maxW="820px">
            <RouterProvider router={router} />
        </Container>
    );
}

export default App;
