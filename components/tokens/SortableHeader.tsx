import { memo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { SortField, SortDirection } from '@/types/token';
import { cn } from '@/lib/utils';

interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentField: SortField;
  currentDirection: SortDirection;
  onSort: (field: SortField) => void;
  align?: 'left' | 'right' | 'center';
}

export const SortableHeader = memo(function SortableHeader({
  field,
  label,
  currentField,
  currentDirection,
  onSort,
  align = 'left'
}: SortableHeaderProps) {
  const isActive = currentField === field;

  const handleClick = () => {
    onSort(field);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider',
        'text-muted-foreground hover:text-foreground transition-smooth',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        align === 'right' && 'justify-end',
        align === 'center' && 'justify-center',
        isActive && 'text-foreground'
      )}
    >
      <span>{label}</span>
      {isActive ? (
        currentDirection === 'asc' ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-50" />
      )}
    </button>
  );
});
