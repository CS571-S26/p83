import { useState } from 'react'

export default function ShareButton({ url, title }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url || window.location.href

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="bb-share-button"
      aria-label={`Share ${title || 'this page'}`}
    >
      {copied ? (
        <>
          <span className="bb-share-button__icon">✓</span>
          <span className="bb-share-button__text">Link copied!</span>
        </>
      ) : (
        <>
          <span className="bb-share-button__icon">⎘</span>
          <span className="bb-share-button__text">Share trip</span>
        </>
      )}
    </button>
  )
}
