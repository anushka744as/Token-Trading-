
"use client";

import { memo, useCallback } from 'react';
import type { Token, SortField, SortConfig } from '@/types/token';
import { TokenRow } from './TokenRow';
import { SortableHeader } from './SortableHeader';
import { TableSkeleton } from './TableSkeleton';
import { useTokenSort } from '@/hooks/useTokenSort';
import { useTokenFilter } from '@/hooks/useTokenFilter';
import { useTokens } from '@/contexts/TokenContext';
import { ScrollArea } from '@/components/ui/scroll-area';


export const TokenTable = memo(function TokenTable() {
  const { tokens, isLoading, sortConfig, setSortConfig, filters } = useTokens();

  const filteredTokens = useTokenFilter(tokens, filters);
  const sortedTokens = useTokenSort(filteredTokens, sortConfig);

  const handleSort = useCallback(
    (field: SortField) => {
      setSortConfig({
        field,
        direction:
          sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    },
    [sortConfig, setSortConfig]
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (sortedTokens.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No tokens found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full rounded-md border border-border">
      <div className="min-w-[1200px]">
        <table className="w-full border-collapse">
          <thead className="bg-table-header sticky top-0 z-10">
            <tr className="border-b border-border">
              <th className="text-left">
                <SortableHeader
                  field="name"
                  label="Token"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left">
                <SortableHeader
                  field="price"
                  label="Price"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left">
                <SortableHeader
                  field="volume24h"
                  label="24h Volume"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left">
                <SortableHeader
                  field="marketCap"
                  label="Market Cap"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left">
                <SortableHeader
                  field="liquidity"
                  label="Liquidity"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left">
                <SortableHeader
                  field="holders"
                  label="Holders"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="text-left">
                <SortableHeader
                  field="createdAt"
                  label="Age"
                  currentField={sortConfig.field}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map(token => (
              <TokenRow key={token.id} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
});
