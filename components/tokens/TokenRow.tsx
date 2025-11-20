import { useMemo } from "react";
import { memo, useState } from 'react';
import type { Token } from '@/types/token';
import { PriceDisplay } from './PriceDisplay';
import { TokenDetailsModal } from './TokenDetailsModal';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
// import { generateSparkline } from '@/lib/sparkline';
import LiveSparkline from "@/components/ui/LiveSparkline";

interface TokenRowProps {
  token: Token;
}

export const TokenRow = memo(function TokenRow({ token }: TokenRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNumber = (value: number): string => {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };
  //const sparkPath = useMemo(() => generateSparkline(), []);

  const formatHolders = (value: number): string => {
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getStatusBadge = (status: Token['status']) => {
    const badges = {
      new: 'bg-primary/20 text-primary',
      'final-stretch': 'bg-yellow-500/20 text-yellow-500',
      migrated: 'bg-blue-500/20 text-blue-500'
    };
    const labels = {
      new: 'New',
      'final-stretch': 'Final Stretch',
      migrated: 'Migrated'
    };
    return (
      <span className={cn('px-2 py-1 rounded text-xs font-medium', badges[status])}>
        {labels[status]}
      </span>
    );
  };

  return (
    <>
      <tr
        onClick={() => setIsModalOpen(true)}
        className="border-b border-border bg-table-row hover:bg-table-row-hover transition-smooth cursor-pointer"
      >
        
        <td className="px-4 py-3">
  <div className="flex items-center gap-3">
    <Image
      src={`/icons/${token.symbol}.png`}
      alt={token.symbol}
      width={40}
      height={40}
      className="rounded-md object-cover"
    />

    <div className="flex flex-col">
      <span className="font-semibold text-sm">{token.name}</span>
      <span className="text-xs text-muted-foreground">{token.symbol}</span>
    </div>
    <td className="px-4 py-3 align-middle">
  <div className="flex items-center justify-center h-10 w-28">
    <LiveSparkline
      color={token.priceChange24h >= 0 ? "#22c55e" : "#ef4444"}
    />
  </div>
</td>
  </div>
</td>
        <td className="px-4 py-3">
          <PriceDisplay
            price={token.price}
            priceChange24h={token.priceChange24h}
            tokenId={token.id}
          />
        </td>
        
        <td className="px-4 py-3">
          <span className="font-mono-numeric text-sm">{formatNumber(token.volume24h)}</span>
        </td>
        <td className="px-4 py-3">
          <span className="font-mono-numeric text-sm">{formatNumber(token.marketCap)}</span>
        </td>
        <td className="px-4 py-3">
          <span className="font-mono-numeric text-sm">{formatNumber(token.liquidity)}</span>
        </td>
        <td className="px-4 py-3">
          <span className="font-mono-numeric text-sm">{formatHolders(token.holders)}</span>
        </td>
        <td className="px-4 py-3">{getStatusBadge(token.status)}</td>
        <td className="px-4 py-3">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(token.createdAt, { addSuffix: true })}
          </span>
        </td>
      </tr>
      <TokenDetailsModal
        token={token}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});
