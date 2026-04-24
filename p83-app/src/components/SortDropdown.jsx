import { useEffect, useRef, useState } from 'react'

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'name', label: 'Name (A-Z)' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'elevation', label: 'Elevation (High to Low)' },
]

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef(null)

  const selectedOption = SORT_OPTIONS.find((opt) => opt.id === value) || SORT_OPTIONS[0]

  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className="bb-sort-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="bb-sort-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="bb-sort-dropdown__label">Sort by:</span>
        <span className="bb-sort-dropdown__value">{selectedOption.label}</span>
        <span className={`bb-sort-dropdown__chev ${isOpen ? 'bb-sort-dropdown__chev--open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className="bb-sort-dropdown__panel" role="listbox">
          {SORT_OPTIONS.map((option) => (
            <li key={option.id} role="none">
              <button
                type="button"
                role="option"
                aria-selected={value === option.id}
                className={`bb-sort-dropdown__option ${value === option.id ? 'bb-sort-dropdown__option--active' : ''}`}
                onClick={() => {
                  onChange(option.id)
                  setIsOpen(false)
                }}
              >
                <span>{option.label}</span>
                {value === option.id && (
                  <span className="bb-sort-dropdown__check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
