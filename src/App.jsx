import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './ui/Layout';
import Booking from './pages/Booking';
import Cheackin from './pages/Cheackin';
import ProtectedRoutes from './ui/ProtectedRoutes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoutes>
                                <Layout />
                            </ProtectedRoutes>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route
                            path="booking/:bookingId"
                            element={<Booking />}
                        />
                        <Route
                            path="checkin/:bookingId"
                            element={<Cheackin />}
                        />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="users" element={<Users />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        background: 'var(--color-grey-0)',
                        color: 'var(--color-grey-700)',
                        fontSize: '16px',
                        padding: '16px 24px',
                        maxWidth: '500px',
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
