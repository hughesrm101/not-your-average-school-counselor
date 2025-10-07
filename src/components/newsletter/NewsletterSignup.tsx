'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  source?: string;
}

export function NewsletterSignup({ 
  title = "Let's be friends",
  description = "Get my latest resources and the real stories behind them - the good, the messy, and the \"what was I thinking\" moments",
  className = "",
  source = "homepage"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thanks for subscribing! Check your email for a welcome message.');
        setEmail('');
        setFirstName('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-blue-100">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || !email}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {message && (
            <p className={`text-sm ${message.includes('Thanks') ? 'text-green-100' : 'text-red-100'}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
