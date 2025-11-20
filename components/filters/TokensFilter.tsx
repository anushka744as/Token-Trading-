"use client";

import { useState } from "react";

const FILTERS = [
  { label: "All Tokens", value: "all" },
  { label: "New Pairs", value: "new" },
  { label: "Final Stretch", value: "final" },
  { label: "Migrated", value: "migrated" },
];

export type TokenFilter = "all" | "new" | "final" | "migrated";

export default function TokensFilter({
  value,
  onChange,
}: {
  value: TokenFilter;
  onChange: (val: TokenFilter) => void;
}) {
  return (
    <div className="flex gap-3 mt-4 mb-6">
      {FILTERS.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value as TokenFilter)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition
            ${
              value === item.value
                ? "bg-gray-700 text-white"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800"
            }
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}