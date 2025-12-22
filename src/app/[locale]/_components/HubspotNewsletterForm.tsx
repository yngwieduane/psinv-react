'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export default function HubspotNewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const PORTAL_ID = '144642261';
      const FORM_ID = '0cb5ba38-4776-45d7-b50c-a67acb17129f';
      
      // Using standard endpoint (handles routing)
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                name: 'email',
                value: data.email,
              },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50/10 border border-green-500/20 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-white/70">
          You've successfully subscribed to our newsletter.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-white/50 hover:text-white transition-colors hover:underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email address"
            disabled={status === 'submitting'}
            className={`w-full px-5 py-4 bg-white/5 border backdrop-blur-sm rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email
                ? 'border-red-500/50 focus:ring-red-500/50'
                : 'border-white/10 focus:border-white/20 focus:ring-white/10 hover:border-white/20'
            }`}
          />
          {errors.email && (
            <div className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-in slide-in-from-top-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-4 bg-white text-[#11174c] font-bold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#11174c] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-black/5 active:scale-[0.98] sm:w-auto w-full flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
            </>
          )}
        </button>
      </div>
      
      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-200 text-sm animate-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}