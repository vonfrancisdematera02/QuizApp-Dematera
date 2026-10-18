import { useEffect, useState } from 'react'
import { AnswerOption } from './components/AnswerOption'
import { ProgressBar } from './components/ProgressBar'
import { QuestionCard } from './components/QuestionCard'
import { QuizHeader } from './components/QuizHeader'
import { ResultCard } from './components/ResultCard'
import { questions } from './questions'
import './App.css'

type Route = '/' | '/quiz' | '/results'

function App() {
  const [route, setRoute] = useState<Route>(
    window.location.pathname === '/quiz' || window.location.pathname === '/results'
      ? window.location.pathname
      : '/',
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  )
  const [isComplete, setIsComplete] = useState(false)

  const score = selectedAnswers.reduce<number>(
    (total, answer, index) => total + Number(answer === questions[index].correctAnswer),
    0,
  )

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setRoute(path === '/quiz' || path === '/results' ? path : '/')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextRoute: Route) => {
    window.history.pushState({}, '', nextRoute)
    setRoute(nextRoute)
  }

  const startQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(Array(questions.length).fill(null))
    setIsComplete(false)
    navigate('/quiz')
  }

  const chooseAnswer = (answerIndex: number) => {
    setSelectedAnswers((previousAnswers) =>
      previousAnswers.map((answer, index) => (index === currentQuestion ? answerIndex : answer)),
    )
  }

  const goToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setIsComplete(true)
      navigate('/results')
      return
    }

    setCurrentQuestion((question) => question + 1)
  }

  const goToPreviousQuestion = () => {
    setCurrentQuestion((question) => Math.max(0, question - 1))
  }

  if (route === '/quiz') {
    const question = questions[currentQuestion]

    return (
      <main className="page-shell">
        <QuizHeader onHome={() => navigate('/')} />
        <section className="quiz-content" aria-label="Quiz">
          <div className="quiz-intro">
            <span className="eyebrow">FRONTEND FUNDAMENTALS</span>
            <h1>Let&apos;s test what you know.</h1>
            <p>Choose the best answer for each question. You can do this!</p>
          </div>
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <QuestionCard
            question={question}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            canGoPrevious={currentQuestion > 0}
            onPrevious={goToPreviousQuestion}
          >
            {question.options.map((option, index) => (
              <AnswerOption
                key={option}
                index={index}
                label={option}
                selected={selectedAnswers[currentQuestion] === index}
                onSelect={() => chooseAnswer(index)}
              />
            ))}
          </QuestionCard>
          <div className="quiz-actions">
            <span className="answer-hint">
              {selectedAnswers[currentQuestion] === null
                ? 'Select an answer to continue'
                : 'Answer selected'}
            </span>
            <button
              className="button button-primary"
              type="button"
              onClick={goToNextQuestion}
              disabled={selectedAnswers[currentQuestion] === null}
            >
              {currentQuestion === questions.length - 1 ? 'See my results' : 'Next question'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
        <footer className="site-footer">Take your time — your progress is saved as you go.</footer>
      </main>
    )
  }

  if (route === '/results') {
    const incorrect = questions.length - score

    return (
      <main className="page-shell">
        <QuizHeader onHome={() => navigate('/')} />
        <section className="results-content" aria-label="Quiz results">
          <ResultCard
            total={questions.length}
            correct={score}
            incorrect={incorrect}
            isComplete={isComplete}
            onRetake={startQuiz}
            onHome={() => navigate('/')}
          />
        </section>
        <footer className="site-footer">Every question is a chance to learn something new.</footer>
      </main>
    )
  }

  return (
    <main className="page-shell home-shell">
      <section className="home-content">
        <div className="home-copy">
          <h1>
            Welcome to the
            <br />
            <strong>Frontend Quiz!</strong>
          </h1>
          <button className="button button-primary start-button" type="button" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
