import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'bb-basecamp-wishlist'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* ignore */
    }
  }, [ids])

  const toggle = useCallback((slug) => {
    setIds((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug],
    )
  }, [])

  const remove = useCallback((slug) => {
    setIds((prev) => prev.filter((id) => id !== slug))
  }, [])

  const isSaved = useCallback((slug) => ids.includes(slug), [ids])

  const value = useMemo(
    () => ({ ids, toggle, remove, isSaved }),
    [ids, toggle, remove, isSaved],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

/* eslint-disable react-refresh/only-export-components -- hook colocated with provider */
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
