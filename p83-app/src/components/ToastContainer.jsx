export default function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className="bb-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`bb-toast bb-toast--${toast.type} bb-toast--show`}>
          <div className="bb-toast__content">
            <span className="bb-toast__message">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="bb-toast__action"
                onClick={() => {
                  toast.action.onClick()
                  onDismiss(toast.id)
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            className="bb-toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
