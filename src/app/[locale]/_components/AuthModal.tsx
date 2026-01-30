'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useUser } from '@/context/userContext';

export default function AuthModal() {
    const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useUser();
    const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Helpers
    const getErrorMessage = (err: any) => {
        const code = err.code || '';
        switch (code) {
            case 'auth/invalid-email': return 'Invalid email address format.';
            case 'auth/user-disabled': return 'This account has been disabled.';
            case 'auth/user-not-found': return 'No account found with this email.';
            case 'auth/wrong-password': return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use': return 'An account with this email already exists.';
            case 'auth/weak-password': return 'Password should be at least 6 characters.';
            case 'auth/popup-closed-by-user': return 'Sign in was cancelled.';
            case 'auth/too-many-requests': return 'Too many requests. Please try again later.';
            case 'auth/invalid-credential': return 'Invalid credentials provided.';
            default: return 'An unexpected error occurred. Please try again.';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (mode === 'login') {
                await signInWithEmail(email, password);
                closeAuthModal();
            } else if (mode === 'signup') {
                await signUpWithEmail(email, password, firstName, lastName);
                closeAuthModal();
            } else if (mode === 'forgot') {
                await resetPassword(email);
                setSuccessMessage('Password reset link sent to your email.');
            }
        } catch (error: any) {
            console.error(error);
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            closeAuthModal();
        } catch (error: any) {
            console.error(error);
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Reset error when switching modes
    const switchMode = (newMode: 'login' | 'signup' | 'forgot') => {
        setMode(newMode);
        setError(null);
        setSuccessMessage(null);
    }

    return (
        <Transition show={isAuthModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeAuthModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={closeAuthModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="text-center">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                                        <Image src="/PSI-Logo.svg" alt="PSI" width={30} height={30} className="h-8 w-auto" />
                                    </div>
                                    <DialogTitle as="h3" className="text-2xl font-semibold leading-6 text-gray-900 mb-2">
                                        {mode === 'signup' ? 'Create an Account' : mode === 'forgot' ? 'Reset Password' : 'Welcome Back'}
                                    </DialogTitle>
                                    <p className="text-sm text-gray-500 mb-6">
                                        {mode === 'signup'
                                            ? 'Connect with Real Estate Opportunities.'
                                            : mode === 'forgot'
                                                ? 'Enter your email to receive a reset link.'
                                                : 'Log inside to access your favorites.'}
                                    </p>

                                    {/* Notifications */}
                                    {error && (
                                        <div className="mb-4 rounded-md bg-red-50 p-3 flex items-start text-left animate-pulse">
                                            <div className="flex-shrink-0">
                                                <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                                <div className="mt-1 text-sm text-red-700"><p>{error}</p></div>
                                            </div>
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div className="mb-4 rounded-md bg-green-50 p-3 flex items-start text-left">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-green-800">Success</h3>
                                                <div className="mt-1 text-sm text-green-700"><p>{successMessage}</p></div>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                        {mode === 'signup' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E55527] sm:text-sm sm:leading-6"
                                                        placeholder="Enter your first name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E55527] sm:text-sm sm:leading-6"
                                                        placeholder="Enter your last name"
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E55527] sm:text-sm sm:leading-6"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {mode !== 'forgot' && (
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                                    {mode === 'login' && (
                                                        <button type="button" onClick={() => switchMode('forgot')} className="text-sm font-semibold text-[#E55527] hover:text-[#c4431d]">
                                                            Forgot password?
                                                        </button>
                                                    )}
                                                </div>
                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E55527] sm:text-sm sm:leading-6"
                                                    placeholder="******"
                                                />
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full rounded-md bg-[#E55527] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d44d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55527] disabled:opacity-70 transition-colors"
                                        >
                                            {isLoading ? 'Processing...' : (mode === 'signup' ? 'Get Started' : mode === 'forgot' ? 'Send Reset Link' : 'Log In')}
                                        </button>
                                    </form>

                                    {mode !== 'forgot' && (
                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-2 text-sm text-gray-500">Or continue with</span>
                                            </div>
                                        </div>
                                    )}

                                    {mode !== 'forgot' && (
                                        <div className="grid grid-cols-1 gap-3">
                                            <button
                                                type="button"
                                                onClick={handleGoogleSignIn}
                                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                            >
                                                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                                    <path d="M12.0003 20.45c4.6667 0 8.0416-3.2375 8.0416-8.1042 0-.75-.0625-1.2875-.1958-1.7291H12.0003v3.2541h4.6333c-.2417 1.55-1.5583 3.3917-4.6333 3.3917-2.775 0-5.0667-2.1833-5.0667-5.2625s2.2917-5.2625 5.0667-5.2625c1.2875 0 2.4542.4708 3.3625 1.3375l2.45-2.45c-1.5708-1.4625-3.6083-2.3417-5.8125-2.3417-4.8 0-8.7 3.9-8.7 8.7167s3.9 8.7167 8.7 8.7167z" fill="#4285F4" />
                                                    <path d="M2.5714 8.7917c.575-1.7083 1.8333-3.0542 3.4291-3.9542l2.45 2.45c-.6875.45-1.2291 1.0958-1.5291 1.875L2.5714 8.7917z" fill="#FBBC05" />
                                                    <path d="M12.0004 4.1458c1.2875 0 2.4542.4708 3.3625 1.3375l2.45-2.45c-1.5708-1.4625-3.6083-2.3417-5.8125-2.3417-1.7333 0-3.3291.6542-4.5708 1.725l2.4833 2.5083c.6917-.4917 1.55-.7791 2.0875-.7791z" fill="#EA4335" />
                                                    <path d="M20.0418 10.6166c.1333.4416.1958.9791.1958 1.7291 0 1.2833-.2291 2.3791-.65 3.3666l-2.0917-1.725c.375-.5.6-1.1291.6-1.7916 0-.5458-.1-.9791-.1833-1.5791h2.1292z" fill="#34A853" />
                                                </svg>
                                                <span className="text-sm font-semibold leading-6">Google</span>
                                            </button>
                                        </div>
                                    )}

                                    <div className="mt-6 text-center text-sm">
                                        {mode === 'signup' ? (
                                            <p className="text-gray-500">
                                                Already have an account?{' '}
                                                <button onClick={() => switchMode('login')} className="font-semibold text-[#E55527] hover:text-[#c4431d]">
                                                    Log in
                                                </button>
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                Don{`'`}t have an account?{' '}
                                                <button onClick={() => switchMode('signup')} className="font-semibold text-[#E55527] hover:text-[#c4431d]">
                                                    Create an Account
                                                </button>
                                            </p>
                                        )}
                                        {mode === 'forgot' && (
                                            <p className="text-gray-500">
                                                Remember your password?{' '}
                                                <button onClick={() => switchMode('login')} className="font-semibold text-[#E55527] hover:text-[#c4431d]">
                                                    Log in
                                                </button>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
