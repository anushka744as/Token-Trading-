import { memo } from 'react';
import type { Token } from '@/types/token';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PriceDisplay } from './PriceDisplay';
import { ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TokenDetailsModalProps {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
}

export const TokenDetailsModal = memo(function TokenDetailsModal({
  token,
  isOpen,
  onClose
}: TokenDetailsModalProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-2xl">{token.name}</DialogTitle>
              <DialogDescription className="text-base">{token.symbol}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Current Price</span>
              <PriceDisplay
                price={token.price}
                priceChange24h={token.priceChange24h}
                tokenId={token.id}
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">24h Volume</span>
              <span className="font-mono-numeric text-sm font-medium">
                {formatNumber(token.volume24h)}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-mono-numeric text-sm font-medium">
                {formatNumber(token.marketCap)}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Liquidity</span>
              <span className="font-mono-numeric text-sm font-medium">
                {formatNumber(token.liquidity)}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Holders</span>
              <span className="font-mono-numeric text-sm font-medium">
                {token.holders.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={cn(
                  'inline-block px-2 py-1 rounded text-xs font-medium',
                  token.status === 'new' && 'bg-primary/20 text-primary',
                  token.status === 'final-stretch' && 'bg-yellow-500/20 text-yellow-500',
                  token.status === 'migrated' && 'bg-blue-500/20 text-blue-500'
                )}
              >
                {token.status === 'new' && 'New'}
                {token.status === 'final-stretch' && 'Final Stretch'}
                {token.status === 'migrated' && 'Migrated'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Contract Address</span>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-muted rounded text-xs font-mono break-all">
                {token.contractAddress}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(token.contractAddress, 'Contract address')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {token.description && (
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="text-sm">{token.description}</p>
            </div>
          )}

          <div className="flex gap-2">
            {token.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={token.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
            {token.twitter && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://twitter.com/${token.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </Button>
            )}
            {token.telegram && (
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${token.telegram}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Telegram
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
