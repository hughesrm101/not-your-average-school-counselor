'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Cookie, Settings } from 'lucide-react'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowConsent(false)
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      // Analytics initialization code here
    }
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    setShowConsent(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowConsent(false)
    setShowSettings(false)
    
    // Initialize analytics if accepted
    if (preferences.analytics) {
      // Analytics initialization code here
    }
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-nyasc-blue-600" />
              <CardTitle className="text-lg">Cookie Preferences</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConsent(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            We use cookies to enhance your experience and analyze our traffic.
          </CardDescription>
        </CardHeader>
        
        {!showSettings ? (
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>
                We use cookies to provide you with the best experience on our site. 
                Some cookies are necessary for the site to function, while others help us 
                understand how you use our site so we can improve it.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleAcceptAll}
                className="flex-1 bg-nyasc-blue-600 hover:bg-nyasc-blue-700"
              >
                Accept All
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1"
              >
                Reject All
              </Button>
            </div>
            
            <Button
              onClick={() => setShowSettings(true)}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize Settings
            </Button>
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Necessary Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Required for the site to function properly
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 text-nyasc-blue-600 rounded border-gray-300"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors use our site
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                  className="h-4 w-4 text-nyasc-blue-600 rounded border-gray-300"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant ads and track campaigns
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange('marketing')}
                  className="h-4 w-4 text-nyasc-blue-600 rounded border-gray-300"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Functional Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Enable enhanced functionality and personalization
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => handlePreferenceChange('functional')}
                  className="h-4 w-4 text-nyasc-blue-600 rounded border-gray-300"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-nyasc-blue-600 hover:bg-nyasc-blue-700"
              >
                Save Preferences
              </Button>
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
