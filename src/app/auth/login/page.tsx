'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Track login attempt
      trackEvent({
        event: 'login_attempt',
        properties: {
          email: formData.email,
        },
        timestamp: new Date().toISOString(),
      });

      // TODO: Implement actual Cognito authentication
      // For now, simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      if (formData.email === 'admin@example.com' && formData.password === 'password') {
        // Set mock session cookies
        document.cookie = 'access_token=mock_token; path=/; max-age=3600';
        document.cookie = 'id_token=mock_id_token; path=/; max-age=3600';
        document.cookie = 'expires_at=' + (Date.now() + 3600000) + '; path=/; max-age=3600';
        
        trackEvent({
          event: 'login_success',
          properties: {
            email: formData.email,
          },
          timestamp: new Date().toISOString(),
        });
        
        router.push(callbackUrl);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      trackEvent({
        event: 'login_error',
        properties: {
          email: formData.email,
          error: err instanceof Error ? err.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nyasc-blue-50 to-nyasc-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">NY</span>
            </div>
          </div>
          <h2 className="heading-2 mb-2">Welcome back</h2>
          <p className="body-regular text-nyasc-gray-600">
            Sign in to your NYASC account
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-nyasc-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-nyasc-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-nyasc-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-nyasc-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-nyasc-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="text-nyasc-blue-600 hover:text-nyasc-blue-700 font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-nyasc-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // TODO: Implement Google OAuth
                  trackEvent({
                    event: 'oauth_attempt',
                    properties: { provider: 'google' },
                    timestamp: new Date().toISOString(),
                  });
                }}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // TODO: Implement Microsoft OAuth
                  trackEvent({
                    event: 'oauth_attempt',
                    properties: { provider: 'microsoft' },
                    timestamp: new Date().toISOString(),
                  });
                }}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1z" />
                  <path fill="#00a4ef" d="M13 1h10v10H13z" />
                  <path fill="#7fba00" d="M1 13h10v10H1z" />
                  <path fill="#ffb900" d="M13 13h10v10H13z" />
                </svg>
                Microsoft
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-nyasc-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-nyasc-blue-600 hover:text-nyasc-blue-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-nyasc-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/legal/terms" className="text-nyasc-blue-600 hover:text-nyasc-blue-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-nyasc-blue-600 hover:text-nyasc-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
