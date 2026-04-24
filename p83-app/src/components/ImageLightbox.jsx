import { useEffect } from 'react'

export default function ImageLightbox({ imageUrl, alt, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="bb-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button
        type="button"
        className="bb-lightbox__close"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ×
      </button>
      <div className="bb-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={alt} className="bb-lightbox__image" />
      </div>
    </div>
  )
}
