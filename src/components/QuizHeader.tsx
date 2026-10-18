type QuizHeaderProps = {
  onHome: () => void
}

export function QuizHeader({ onHome }: QuizHeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={onHome} aria-label="Frontend Quiz home">  
        <span>frontend<span className="brand-accent">quiz</span></span>
      </button>
      
    </header>
  )
}
