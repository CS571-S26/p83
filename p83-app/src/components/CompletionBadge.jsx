export default function CompletionBadge({ isCompleted }) {
  if (!isCompleted) {
    return null
  }

  return (
    <span className="bb-completion-badge" aria-label="Completed trip">
      ✓ Completed
    </span>
  )
}
