type AnswerOptionProps = {
  index: number
  label: string
  selected: boolean
  onSelect: () => void
}

const optionLabels = ['A', 'B', 'C', 'D']

export function AnswerOption({ index, label, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      className={`answer-option${selected ? ' selected' : ''}`}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
    >
      <span className="option-letter">{optionLabels[index]}</span>
      <span>{label}</span>
      <span className="option-indicator" aria-hidden="true">{selected ? '✓' : ''}</span>
    </button>
  )
}
