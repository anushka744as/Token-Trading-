import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { Token, SortConfig, TokenFilters, PriceUpdate } from '@/types/token';
import { generateMockTokens } from '@/services/mockData';
import { websocketService } from '@/services/websocket';

interface TokenContextValue {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  sortConfig: SortConfig;
  filters: TokenFilters;
  setSortConfig: (config: SortConfig) => void;
  setFilters: (filters: TokenFilters) => void;
  refreshTokens: () => void;
}

export const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<TokenFilters>({});

  const loadTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTokens = generateMockTokens(60);
      setTokens(mockTokens);
      
      websocketService.connect(
        mockTokens.map(t => ({ id: t.id, price: t.price }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tokens');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTokens();

    return () => {
      websocketService.disconnect();
    };
  }, [loadTokens]);

  useEffect(() => {
    const unsubscribe = websocketService.subscribe((update: PriceUpdate) => {
      setTokens(prevTokens =>
        prevTokens.map(token =>
          token.id === update.tokenId
            ? {
                ...token,
                price: update.price,
                priceChange24h: update.priceChange24h,
                lastUpdated: update.timestamp
              }
            : token
        )
      );
    });

    return unsubscribe;
  }, []);

  const refreshTokens = useCallback(() => {
    loadTokens();
  }, [loadTokens]);

  const value = useMemo(
    () => ({
      tokens,
      isLoading,
      error,
      sortConfig,
      filters,
      setSortConfig,
      setFilters,
      refreshTokens
    }),
    [tokens, isLoading, error, sortConfig, filters, refreshTokens]
  );

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}
