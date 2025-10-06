'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView, trackEvent } from '@/lib/analytics'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView({ 
      url, 
      title: document.title,
      timestamp: new Date().toISOString()
    })

    // Track Core Web Vitals (simplified for now)
    if (typeof window !== 'undefined') {
      // Basic performance tracking
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        trackEvent({
          event: 'page_performance',
          properties: {
            load_time: perfData.loadEventEnd - perfData.loadEventStart,
            dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            first_byte: perfData.responseStart - perfData.requestStart,
          },
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Track user engagement
    let startTime = Date.now()
    let isVisible = true

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeOnPage = Date.now() - startTime
        trackEvent({
          event: 'page_engagement',
          properties: {
            time_on_page: timeOnPage,
            page_url: url,
          },
          timestamp: new Date().toISOString(),
        })
      } else {
        startTime = Date.now()
      }
    }

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime
      trackEvent({
        event: 'page_engagement',
        properties: {
          time_on_page: timeOnPage,
          page_url: url,
        },
        timestamp: new Date().toISOString(),
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [pathname, searchParams])

  return null
}
