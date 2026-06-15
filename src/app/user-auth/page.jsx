"use client"

import Link from "next/link"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import Loader from "../../app/components/Loader";


const page = () => {

    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.NEXTAUTH_URL;

    const handleLogin = async (provider) => {
        setIsLoading(true);

        try {
            await signIn(provider, {callbackUrl: url})
            toast.info(`Logging with ${provider}`)

        }
        catch (err) {
            toast.error(`failed to login with ${provider}, please try again`)
        }
    }

    return (
        <div className='flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800'>
            {isLoading && <Loader />}
            {/* Login image section */}
            <div className="hidden w-1/2 bg-gray-100 lg:block">
                <Image
                    src='/images/meet_image.jpg'
                    loading='eager'
                    width={1080}
                    height={1080}
                    alt='login image'
                    className='object-cover w-full h-full'
                />
            </div>

            {/* right section */}
            <div className='flex flex-col justify-center w-full p-8 lg:w-1/2'>

                {/* text and login button section */}
                <div className="max-w-md mx-auto">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Welcome to VoxaMeet</h1>
                    <p className='mb-4 text-gray-600 dark:text-gray-400'>
                        Connect with your team anytime, anywhere. Join or start meetings with crystal-clear HD video and audio.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Button className="w-full dark:hover:bg-white dark:hover:text-black" variant='outline' onClick={()=>{handleLogin('google')}}>
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Login with Google
                        </Button>

                        <div className=" flex items-center gap-2s text-md font-semibold text-stone-400">
                            <div className="h-px flex-1 bg-stone-400" />
                            <span className=" px-3 py-1  text-stone-500">
                                or
                            </span>
                            <div className="h-px flex-1 bg-stone-400" />
                        </div>

                        <Button className="w-full bg-black text-white dark:hover:bg-gray-200 dark:bg-white dark:text-black" variant='outline' onClick={()=>{handleLogin('github')}}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            Login with GitHub
                        </Button>

                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="#"
                                className="text-blue-500 hover:underline dark:text-blue-400"
                            >
                                Create now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page