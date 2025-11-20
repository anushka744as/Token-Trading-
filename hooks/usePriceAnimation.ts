import { useEffect, useRef, useState } from 'react';

export type PriceDirection = 'up' | 'down' | 'neutral';

export function usePriceAnimation(price: number, tokenId: string) {
  const [direction, setDirection] = useState<PriceDirection>('neutral');
  const previousPriceRef = useRef<number>(price);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const previousPrice = previousPriceRef.current;
    
    if (price > previousPrice) {
      setDirection('up');
    } else if (price < previousPrice) {
      setDirection('down');
    }
    
    previousPriceRef.current = price;
    
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setDirection('neutral');
    }, 600);
    
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [price, tokenId]);

  return direction;
}
