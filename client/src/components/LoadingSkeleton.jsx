export function LoadingSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading todos">
      {[80, 60, 90].map((w, i) => (
        <div key={i} className="bg-white border border-ink-100 rounded-xl p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded bg-ink-100 animate-pulse flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className={`h-4 bg-ink-100 rounded animate-pulse`} style={{ width: `${w}%` }} />
            {i === 0 && <div className="h-3 bg-ink-100 rounded animate-pulse w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
}
