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
  answered: boolean; // ✅ Шинээр нэмсэн property
}

export const initialQuestions: QuizQuestion[] = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  // Нэмэлт асуултууд оруулж болно
];

export const hasNextQuestion = (state: QuizState): boolean => {
  return state.currentQuestionIndex < state.questions.length - 1;
};

export const goToNextQuestion = (state: QuizState): QuizState => {
  return {
    ...state,
    currentQuestionIndex: state.currentQuestionIndex + 1,
    selectedAnswer: null,
    answered: false, // ✅ дараагийн асуулт руу шилжихэд хариулаагүй болгоно
  };
};
