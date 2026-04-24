export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="bb-loading-spinner" role="status" aria-live="polite">
      <div className="bb-loading-spinner__circle" aria-hidden="true" />
      <span className="bb-loading-spinner__message">{message}</span>
    </div>
  )
}
