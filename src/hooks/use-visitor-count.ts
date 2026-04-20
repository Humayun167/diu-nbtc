/**
 * Visitor Count Hook
 * 
 * Tracks and manages visitor count using localStorage.
 * Increments count on first visit per session.
 */

import { useState, useEffect } from 'react';

const VISITOR_COUNT_KEY = 'nbtc_visitor_count';
const VISITED_SESSION_KEY = 'nbtc_visited_session';

export function useVisitorCount() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current count from localStorage
    const storedCount = localStorage.getItem(VISITOR_COUNT_KEY);
    const hasVisitedThisSession = sessionStorage.getItem(VISITED_SESSION_KEY);
    
    let currentCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // If this is a new session, increment the count
    if (!hasVisitedThisSession) {
      currentCount += 1;
      localStorage.setItem(VISITOR_COUNT_KEY, currentCount.toString());
      sessionStorage.setItem(VISITED_SESSION_KEY, 'true');
    }
    
    setVisitorCount(currentCount);
    setIsLoading(false);
  }, []);

  return { visitorCount, isLoading };
}

export default useVisitorCount;
