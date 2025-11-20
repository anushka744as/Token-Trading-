# 🚀 Token Trading Dashboard  
A modern, responsive, and real-time token analytics dashboard built with **Next.js**, **TypeScript**, and **TailwindCSS**.  
This project displays token price movements, volatility, holders, liquidity, and market data with sorting, filtering, and live sparkline charts.

---

## ✨ Features

### 🔍 **Real-Time Token Stats**
- Live price updates  
- Market cap, liquidity, holders count  
- 24h volume & token age tracking  

### 📊 **Interactive Table**
- Sort by **Price**, **Volume**, **Market Cap**, **Liquidity**, **Holders**, **Age**
- Sticky header  
- Fully scrollable and responsive  

### ⚡ **Dynamic Filters**
- Filter tokens by:
  - All Tokens  
  - New Pairs  
  - Final Stretch  
  - Migrated  
- Instant refresh option  

### 📈 **Live Sparklines**
- Red/Green animated sparkline movement for each token  
- Smooth and lightweight  

### 🖼 **Token Icons**
- Each token includes a real SVG/PNG icon  
- Images served from `/public/token-icons/`  

### 💡 **Clean Architecture**
- Custom hooks (`useTokenSort`, `useTokenFilter`, `usePriceAnimation`)  
- Context Provider (`TokenContext`)  
- Component-based reusable UI  

### 🚀 **Production Ready**
- Fully deployed on Vercel  
- Zero external backend required  
- Fast SSR + client hydration  

---

## 🛠️ **Tech Stack**

| Category | Technology |
|---------|------------|
| Frontend Framework | **Next.js 14 (App Router)** |
| Language | **TypeScript** |
| Styling | **TailwindCSS** |
| State Mgmt | React Context API |
| Charts | Custom Canvas Sparkline |
| Deployment | **Vercel** |

---

## 📂 **Project Structure**
