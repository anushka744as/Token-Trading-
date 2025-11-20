// "use client";

// import { useState, useMemo } from "react";
// import TokensFilter, { TokenFilter } from "@/components/filters/TokensFilter";
// import { TokenTable } from "@/components/tokens/TokenTable";
// import { TOKENS } from "@/data/tokensData"; 
// // replace with your real token list

// export default function Page() {
//   const [filter, setFilter] = useState<TokenFilter>("all");

//   const filteredTokens = useMemo(() => {
//     if (filter === "all") return TOKENS;
//     if (filter === "new") return TOKENS.filter((t) => t.status === "New");
//     if (filter === "final") return TOKENS.filter((t) => t.status === "Final Stretch");
//     if (filter === "migrated") return TOKENS.filter((t) => t.status === "Migrated");
//     return TOKENS;
//   }, [filter]);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold">Token Trading Table</h1>
//       <p className="text-gray-400 mt-1">Real-time token discovery and trading information</p>

//       <TokensFilter value={filter} onChange={setFilter} />

//       <TokenTable tokens={filteredTokens} />
//     </div>
//   );
// }
"use client";

import FiltersBar from "@/components/filters/FiltersBar";
import { TokenTable } from "@/components/tokens/TokenTable";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Token Trading Table</h1>
      <p className="text-muted-foreground mb-6">
        Real-time token discovery and trading information
      </p>

      <FiltersBar />

      <TokenTable />
    </div>
  );
}