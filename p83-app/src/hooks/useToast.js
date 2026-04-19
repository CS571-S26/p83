import { useState, useEffect, useCallback } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, options = {}) => {
    const id = toastId++
    const type = options.type || 'info' // info, success, error, warning
    const duration = options.duration || 3000
    const action = options.action || null

    const toast = {
      id,
      message,
      type,
      action,
    }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }

    return id
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, dismissToast }
}
