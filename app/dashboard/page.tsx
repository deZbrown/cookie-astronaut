"use client"

import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import Head from 'next/head'

const Dashboard = () => {
    const { toast } = useToast()

    useEffect(() => {
        toast({
            className:
                'bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4',
            title: 'Welcome!',
            description: "You're logged in!",
        })
    }, [])

    return (
        <>
            <Head>
                <title>Dive Depper - Dashboard</title>
            </Head>

            <div className="dark:bg-gray-900">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* To-Do App Section */}
                    
                </div>
            </div>
        </> 
    )
}

export default Dashboard