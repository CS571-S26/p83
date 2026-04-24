export default function FilterPills({ activeFilters, onRemove }) {
  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="bb-filter-pills" role="list" aria-label="Active filters">
      {activeFilters.map((filter) => (
        <div key={filter.id} className="bb-filter-pill" role="listitem">
          <span className="bb-filter-pill__label">
            {filter.category}: {filter.label}
          </span>
          <button
            type="button"
            className="bb-filter-pill__remove"
            onClick={() => onRemove(filter.id, filter.category)}
            aria-label={`Remove ${filter.category} filter: ${filter.label}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
