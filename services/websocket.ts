import type { PriceUpdate } from '@/types/token';
import { simulatePriceUpdate } from './mockData';

type PriceUpdateCallback = (update: PriceUpdate) => void;

export class MockWebSocketService {
  private subscribers: Set<PriceUpdateCallback> = new Set();
  private intervalId: number | null = null;
  private tokenPrices: Map<string, number> = new Map();
  private isConnected = false;

  connect(tokens: Array<{ id: string; price: number }>): void {
    if (this.isConnected) {
      return;
    }

    tokens.forEach(token => {
      this.tokenPrices.set(token.id, token.price);
    });

    this.isConnected = true;
    this.startPriceUpdates();
  }

  disconnect(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    this.subscribers.clear();
  }

  subscribe(callback: PriceUpdateCallback): () => void {
    this.subscribers.add(callback);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private startPriceUpdates(): void {
    this.intervalId = window.setInterval(() => {
      this.tokenPrices.forEach((currentPrice, tokenId) => {
        if (Math.random() > 0.7) {
          const newPrice = simulatePriceUpdate(currentPrice);
          const priceChange = ((newPrice - currentPrice) / currentPrice) * 100;
          
          this.tokenPrices.set(tokenId, newPrice);
          
          const update: PriceUpdate = {
            tokenId,
            price: newPrice,
            priceChange24h: priceChange,
            timestamp: Date.now()
          };

          this.notifySubscribers(update);
        }
      });
    }, 2000);
  }

  private notifySubscribers(update: PriceUpdate): void {
    this.subscribers.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('Error in WebSocket subscriber:', error);
      }
    });
  }

  updateTokenList(tokens: Array<{ id: string; price: number }>): void {
    tokens.forEach(token => {
      if (!this.tokenPrices.has(token.id)) {
        this.tokenPrices.set(token.id, token.price);
      }
    });
  }
}

export const websocketService = new MockWebSocketService();
