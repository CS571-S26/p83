import { useEffect } from 'react'

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="bb-modal-overlay" onClick={onCancel}>
      <div className="bb-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="bb-modal__header">
          <h3 className="bb-modal__title">{title}</h3>
          <button
            type="button"
            className="bb-modal__close"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        <div className="bb-modal__body">
          <p>{message}</p>
        </div>
        <div className="bb-modal__footer">
          <button type="button" className="bb-btn bb-btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="bb-btn bb-btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
