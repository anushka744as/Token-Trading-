"use client";

import { useTokens } from "@/contexts/TokenContext";

const FILTERS = [
  { key: "all", label: "All Tokens" },
  { key: "new", label: "New Pairs" },
  { key: "final-stretch", label: "Final Stretch" },
  { key: "migrated", label: "Migrated" }
] as const;

export default function FiltersBar() {
  const { filters, setFilters } = useTokens();

  const handleFilterClick = (key: string) => {
    if (key === "all") {
      // DO NOT set status to "all" ❌ invalid
      setFilters({ ...filters, status: undefined });
    } else {
      setFilters({ ...filters, status: key as any });
    }
  };

  const activeKey = filters.status ?? "all";

  return (
    <div className="flex gap-3 mb-4">
      {FILTERS.map(f => (
        <button
          key={f.key}
          onClick={() => handleFilterClick(f.key)}
          className={`px-4 py-2 rounded-md border ${
            activeKey === f.key
              ? "bg-white text-black font-semibold"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {f.label}
        </button>
      ))}

      <button
        onClick={() => window.location.reload()}
        className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
      >
        Refresh ⟳
      </button>
    </div>
  );
}