import { useMemo } from 'react';
import type { Token, SortConfig } from '@/types/token';

export function useTokenSort(tokens: Token[], sortConfig: SortConfig): Token[] {
  return useMemo(() => {
    const sorted = [...tokens];
    
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [tokens, sortConfig]);
}
