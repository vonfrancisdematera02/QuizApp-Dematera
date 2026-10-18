type ResultCardProps = {
  total: number
  correct: number
  incorrect: number
  isComplete: boolean
  onRetake: () => void
  onHome: () => void
}

export function ResultCard({
  total,
  correct,
  incorrect,
  isComplete,
  onRetake,
  onHome,
}: ResultCardProps) {
  const percentage = Math.round((correct / total) * 100)
  const message =
    percentage === 100
      ? 'Flawless! You really know your frontend.'
      : percentage >= 70
        ? 'Great work — your frontend knowledge is looking strong.'
        : 'Nice effort! Every attempt is a step forward.'

  return (
    <div className="result-card">
      <div className="result-icon" aria-hidden="true">{percentage >= 70 ? '✦' : '✓'}</div>
      <span className="eyebrow">QUIZ COMPLETE</span>
      <h1>Your score</h1>
      <p className="result-message">
        {isComplete ? message : 'Finish the quiz to see your final score.'}
      </p>
      <div className="score-display">
        <span className="score-value">{correct}<span>/{total}</span></span>
        <span className="score-caption">correct answers</span>
      </div>
      <div className="result-stats">
        <div className="result-stat">
          <span className="stat-number correct-number">{correct}</span>
          <span>Correct</span>
        </div>
        <div className="result-stat">
          <span className="stat-number incorrect-number">{incorrect}</span>
          <span>Incorrect</span>
        </div>
        <div className="result-stat">
          <span className="stat-number">{percentage}%</span>
          <span>Percentage</span>
        </div>
      </div>
      <div className="result-actions">
        <button className="button button-primary" type="button" onClick={onRetake}>
          Retake Quiz <span aria-hidden="true">↻</span>
        </button>
        <button className="button button-secondary" type="button" onClick={onHome}>
          Return Home
        </button>
      </div>
    </div>
  )
}
