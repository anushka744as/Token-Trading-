import { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenTable } from './TokenTable';
import { useTokens } from '@/contexts/TokenContext';
import type { TokenStatus } from '@/types/token';

export const TokenTabs = memo(function TokenTabs() {
  const { setFilters } = useTokens();

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setFilters({});
    } else {
      setFilters({ status: value as TokenStatus });
    }
  };

  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
        <TabsTrigger value="all">All Tokens</TabsTrigger>
        <TabsTrigger value="new">New Pairs</TabsTrigger>
        <TabsTrigger value="final-stretch">Final Stretch</TabsTrigger>
        <TabsTrigger value="migrated">Migrated</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-0">
        <TokenTable />
      </TabsContent>
      <TabsContent value="new" className="mt-0">
        <TokenTable />
      </TabsContent>
      <TabsContent value="final-stretch" className="mt-0">
        <TokenTable />
      </TabsContent>
      <TabsContent value="migrated" className="mt-0">
        <TokenTable />
      </TabsContent>
    </Tabs>
  );
});
