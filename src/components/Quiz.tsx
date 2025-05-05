// src/components/Quiz.tsx

import React, { useState } from 'react';
import './Quiz.css';
import { QuizState, initialQuestions, hasNextQuestion, goToNextQuestion } from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    answered: false,
  });

  const handleOptionSelect = (option: string): void => {
    if (!state.answered) {
      setState((prev) => ({
        ...prev,
        selectedAnswer: option,
      }));
    }
  };

  const handleButtonClick = (): void => {
    if (!state.selectedAnswer) return;

    const isCorrect = state.selectedAnswer === state.questions[state.currentQuestionIndex].correctAnswer;

    setState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answered: true,
    }));
  };

  const handleNextQuestion = (): void => {
    if (hasNextQuestion(state)) {
      setState(goToNextQuestion(state));
    }
  };

  const { questions, currentQuestionIndex, selectedAnswer, score, answered } = state;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => {
          let optionClass = '';
          if (answered) {
            if (option === selectedAnswer) {
              optionClass = option === currentQuestion.correctAnswer ? 'correct' : 'incorrect';
            } else if (option === currentQuestion.correctAnswer) {
              optionClass = 'correct';
            }
          }

          return (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`${selectedAnswer === option ? 'selected' : ''} ${optionClass}`}
              style={{ pointerEvents: answered ? 'none' : 'auto' }}
            >
              {option}
            </li>
          );
        })}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {!answered && (
        <button onClick={handleButtonClick} disabled={!selectedAnswer}>
          Submit
        </button>
      )}

      {answered && hasNextQuestion(state) && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}

      {answered && !hasNextQuestion(state) && (
        <p className="quiz-completed">You've completed the quiz!</p>
      )}
    </div>
  );
};

export default Quiz;
