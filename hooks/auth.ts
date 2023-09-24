import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface RegisterProps {
    setErrors: (errors: string[]) => void;
    [key: string]: any;
}

interface LoginProps {
    email: string;
    password: string;
    remember: boolean;
    setErrors: (errors: Record<string, string[]>) => void;
    setStatus: (status: string | null) => void;
}

interface ForgotPasswordProps {
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
    email: string;
}

interface ResetPasswordProps {
    token: string;
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
    [key: string]: any;
}

interface ResendEmailVerificationProps {
    setStatus: (status: string) => void;
}

interface UseAuthOptions {
    middleware?: string;
    redirectIfAuthenticated?: string;
}

interface UseAuthReturn {
    user: any;
    register: (props: RegisterProps) => Promise<void>;
    login: (props: LoginProps) => Promise<void>;
    forgotPassword: (props: ForgotPasswordProps) => Promise<void>;
    resetPassword: (props: ResetPasswordProps) => Promise<void>;
    resendEmailVerification: (props: ResendEmailVerificationProps) => void;
    logout: () => Promise<void>;
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: UseAuthOptions = {}): UseAuthReturn => {
    const router = useRouter();
    const { token } = useParams();
    const appUri = process.env.NEXT_PUBLIC_API_URI || '/api/user';

    const { data: user, error, mutate } = useSWR(appUri, () =>
        axios
            .get(appUri)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;

                router.push('/verify-email');
            }),
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await csrf();

        setErrors([]);

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
        await csrf();

        setErrors({});
        setStatus(null);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };


    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: ForgotPasswordProps) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({
        token,
        setErrors,
        setStatus,
        ...props
    }: ResetPasswordProps & { token: string }) => {
    
        await csrf();
    
        setErrors([]);
        setStatus(null);
    
        axios
            .post('/reset-password', { token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error;
    
                setErrors(error.response.data.errors);
            });
    };
    
    

    const resendEmailVerification = ({
        setStatus,
    }: ResendEmailVerificationProps) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }
    
        window.location.pathname = '/login';
    }, [error, mutate]);

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated as string);
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at &&
            redirectIfAuthenticated
        )
            router.push(redirectIfAuthenticated as string);
        if (middleware === 'auth' && error) logout();
    }, [user, error, redirectIfAuthenticated, middleware, router, logout]);
    
    

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
};
