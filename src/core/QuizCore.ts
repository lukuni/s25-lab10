// src/core/QuizCore.ts

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
}

export const initialQuestions: QuizQuestion[] = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  // Add more questions here
];

export const getScore = (state: QuizState): number => {
  return state.questions.reduce((score, question, index) => {
    return question.correctAnswer === state.selectedAnswer ? score + 1 : score;
  }, 0);
};

export const hasNextQuestion = (state: QuizState): boolean => {
  return state.currentQuestionIndex < state.questions.length - 1;
};

export const goToNextQuestion = (state: QuizState): QuizState => {
  return {
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
    selectedAnswer: null,
  };
};
