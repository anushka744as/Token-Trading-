import { memo } from 'react';
import { usePriceAnimation } from '@/hooks/usePriceAnimation';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  priceChange24h: number;
  tokenId: string;
  showChange?: boolean;
}

export const PriceDisplay = memo(function PriceDisplay({
  price,
  priceChange24h,
  tokenId,
  showChange = true
}: PriceDisplayProps) {
  const direction = usePriceAnimation(price, tokenId);

  const formatPrice = (value: number): string => {
    if (value < 0.01) {
      return value.toFixed(8);
    }
    if (value < 1) {
      return value.toFixed(6);
    }
    if (value < 100) {
      return value.toFixed(4);
    }
    return value.toFixed(2);
  };

  const formatChange = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          'font-mono-numeric text-sm font-medium transition-smooth',
          direction === 'up' && 'price-flash-up',
          direction === 'down' && 'price-flash-down'
        )}
      >
        ${formatPrice(price)}
      </span>
      {showChange && (
        <span
          className={cn(
            'font-mono-numeric text-xs font-medium',
            priceChange24h >= 0 ? 'text-positive' : 'text-negative'
          )}
        >
          {formatChange(priceChange24h)}
        </span>
      )}
    </div>
  );
});
