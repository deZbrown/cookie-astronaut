import Head from 'next/head';
import { ReactNode, FC } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
}

const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Deep Dive</title>
            </Head>

            <div className="font-sans text-gray-900 dark:text-gray-100 antialiased">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;
