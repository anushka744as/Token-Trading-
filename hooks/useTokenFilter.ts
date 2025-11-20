import { useMemo } from 'react';
import type { Token, TokenFilters } from '@/types/token';

export function useTokenFilter(tokens: Token[], filters: TokenFilters): Token[] {
  return useMemo(() => {
    return tokens.filter(token => {
      if (filters.status && token.status !== filters.status) {
        return false;
      }
      
      if (filters.minPrice !== undefined && token.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice !== undefined && token.price > filters.maxPrice) {
        return false;
      }
      
      if (filters.minVolume !== undefined && token.volume24h < filters.minVolume) {
        return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          token.name.toLowerCase().includes(searchLower) ||
          token.symbol.toLowerCase().includes(searchLower) ||
          token.contractAddress.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [tokens, filters]);
}
