import { useInViewOnce } from '../hooks/useInViewOnce'

export default function SectionReveal({ children, className = '' }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.12 })
  return (
    <div ref={ref} className={`bb-section-reveal ${visible ? 'bb-section-reveal--visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
