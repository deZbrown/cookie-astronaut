import React, { ReactNode } from 'react';

interface AuthCardProps {
    logo: ReactNode;
    children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-black">
        <div>{logo}</div>
        
        <div className='w-4/5'>
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-900 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
        
    </div>
);

export default AuthCard;
