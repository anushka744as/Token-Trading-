import type { Token, TokenStatus } from '@/types/token';

const TOKEN_NAMES = [
  'PullChain', 'MoonToken', 'RocketFuel', 'DiamondHat', 'SafenMoon',
  'ElonDodge', 'MetaVerse', 'CryptoKing', 'GalaxyTok', 'StarsShip',
  'QuantLeap', 'NovalCoin', 'ZeniToken', 'ApexCrypto', 'VortexFine',
  'NebulaPay', 'CosmicSwap', 'StelDexel', 'OrionProt', 'PhoenRise'
];

const SYMBOLS = [
  'PLSC', 'MOON', 'RKTF', 'DMND', 'SAFE',
  'EDOGE', 'META', 'KING', 'GLXY', 'STAR',
  'QNTM', 'NOVA', 'ZNTH', 'APEX', 'VRTX',
  'NEBL', 'COSM', 'STLR', 'ORION', 'PHNX'
];

function generateContractAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateMockToken(index: number, status: TokenStatus): Token {
  const now = Date.now();
  const ageInHours = randomInRange(0, 48);
  
  return {
    id: `token-${status}-${index}`,
    name: TOKEN_NAMES[index % TOKEN_NAMES.length],
    symbol: SYMBOLS[index % SYMBOLS.length],
    price: randomInRange(0.000001, 10),
    priceChange24h: randomInRange(-50, 150),
    volume24h: randomInRange(10000, 5000000),
    marketCap: randomInRange(50000, 10000000),
    liquidity: randomInRange(5000, 1000000),
    holders: Math.floor(randomInRange(100, 50000)),
    status,
    createdAt: now - (ageInHours * 60 * 60 * 1000),
    lastUpdated: now,
    contractAddress: generateContractAddress(),
    description: `${TOKEN_NAMES[index % TOKEN_NAMES.length]} is a revolutionary token on the blockchain.`,
    website: `https://${SYMBOLS[index % SYMBOLS.length].toLowerCase()}.io`,
    twitter: `@${SYMBOLS[index % SYMBOLS.length]}`,
    telegram: `t.me/${SYMBOLS[index % SYMBOLS.length]}`
  };
}

export function generateMockTokens(count: number = 20): Token[] {
  const tokens: Token[] = [];
  const statusTypes: TokenStatus[] = ['new', 'final-stretch', 'migrated'];

  const safeCount = Math.min(count, TOKEN_NAMES.length);

  for (let i = 0; i < safeCount; i++) {
    const status = statusTypes[i % statusTypes.length];
    tokens.push(generateMockToken(i, status));
  }

  return tokens;
}

export function simulatePriceUpdate(currentPrice: number): number {
  const changePercent = randomInRange(-5, 5);
  const newPrice = currentPrice * (1 + changePercent / 100);
  return Math.max(0.000001, newPrice);
}
