import type { ReactNode } from 'react'
import type { QuizQuestion } from '../questions'

type QuestionCardProps = {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  children: ReactNode
  onPrevious: () => void
  canGoPrevious: boolean
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  children,
  onPrevious,
  canGoPrevious,
}: QuestionCardProps) {
  return (
    <section className="question-card">
      <div className="question-card-heading">
        <span className="question-label">QUESTION {String(questionNumber).padStart(2, '0')}</span>
        <span className="question-count">{questionNumber} of {totalQuestions}</span>
      </div>
      <h2>{question.question}</h2>
      <div className="answer-list" role="radiogroup" aria-label={question.question}>
        {children}
      </div>
      <div className="question-card-footer">
        <button
          className="button button-secondary previous-button"
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          <span aria-hidden="true">←</span>
          Previous question
        </button>
      </div>
    </section>
  )
}
