import { TokenTabs } from '@/components/tokens/TokenTabs';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTokens } from '@/contexts/TokenContext';

export default function HomePage() {
  const { refreshTokens, isLoading } = useTokens();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 xl:py-8">
        <div className="flex flex-col gap-4 mb-6 xl:flex-row xl:items-center xl:justify-between xl:mb-8">
          <div>
            <h1 className="text-2xl xl:text-4xl font-bold mb-2">Token Trading Table</h1>
            <p className="text-sm xl:text-base text-muted-foreground">
              Real-time token discovery and trading information
            </p>
          </div>
          <Button
            onClick={refreshTokens}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <TokenTabs />
      </div>
    </div>
  );
}
