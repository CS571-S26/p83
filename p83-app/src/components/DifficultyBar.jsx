const DIFFICULTY_LEVELS = {
  Easy: 1,
  Moderate: 2,
  Challenging: 3,
}

export default function DifficultyBar({ difficulty }) {
  const level = DIFFICULTY_LEVELS[difficulty] || 2
  const maxBars = 3

  return (
    <div className="bb-difficulty-bar" aria-label={`Difficulty: ${difficulty}`}>
      <span className="bb-difficulty-bar__label">{difficulty}</span>
      <div className="bb-difficulty-bar__visual" aria-hidden="true">
        {Array.from({ length: maxBars }).map((_, i) => (
          <span
            key={i}
            className={`bb-difficulty-bar__segment ${i < level ? 'bb-difficulty-bar__segment--active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
