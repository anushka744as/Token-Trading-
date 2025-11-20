export type TokenStatus = 'new' | 'final-stretch' | 'migrated';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  status: TokenStatus;
  createdAt: number;
  lastUpdated: number;
  contractAddress: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  timestamp: number;
}

export type SortField = 'name' | 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'holders' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface TokenFilters {
  status?: TokenStatus;
  minPrice?: number;
  maxPrice?: number;
  minVolume?: number;
  search?: string;
}
