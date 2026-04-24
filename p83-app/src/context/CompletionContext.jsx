import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const CompletionContext = createContext()

const STORAGE_KEY = 'bb-completed-trips'

export function CompletionProvider({ children }) {
  const [completedTrips, setCompletedTrips] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTrips))
  }, [completedTrips])

  const toggleCompletion = useCallback((slug) => {
    setCompletedTrips((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug)
      }
      return [...prev, slug]
    })
  }, [])

  const isCompleted = useCallback(
    (slug) => {
      return completedTrips.includes(slug)
    },
    [completedTrips]
  )

  const clearAll = useCallback(() => {
    setCompletedTrips([])
  }, [])

  const value = {
    completedTrips,
    toggleCompletion,
    isCompleted,
    clearAll,
  }

  return <CompletionContext.Provider value={value}>{children}</CompletionContext.Provider>
}

export function useCompletion() {
  const context = useContext(CompletionContext)
  if (!context) {
    throw new Error('useCompletion must be used within CompletionProvider')
  }
  return context
}
