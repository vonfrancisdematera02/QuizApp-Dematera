export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: '1 + 1 = ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'What is the biggest planet in our solar system?',
    options: [
      'Earth',
      'Mars',
      'Jupiter',
      'Saturn',
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'What is the my favorite food?',
    options: ['Pizza', 'Chicken Joy', 'Calamares', 'Adobo'],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: 'How many colors are in the rainbow?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: '9 * 9 = ?',
    options: ['81', '99', '18', '0'],
    correctAnswer: 0,
  },
]
