import React, { useState } from 'react';
import './Quiz.css';
import { QuizState, initialQuestions, getScore, hasNextQuestion, goToNextQuestion } from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    answered: false, // Track if the question is answered
  });

  const handleOptionSelect = (option: string): void => {
    // Only allow option selection if no answer has been selected
    if (!state.answered) {
      setState((prevState) => ({
        ...prevState,
        selectedAnswer: option,
      }));
    }
  };

  const handleButtonClick = (): void => {
    const { selectedAnswer, score, currentQuestionIndex, questions } = state;

    if (!selectedAnswer) return; // Ensure an answer is selected before proceeding

    // Check if the selected answer is correct and update score
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,  // Increase score if answer is correct
      }));
    }

    // Mark question as answered
    setState((prevState) => ({
      ...prevState,
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

  // Render the final score when quiz is completed
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
          // Determine the class to apply to each option
          let optionClass = '';
          if (answered) {
            if (option === selectedAnswer) {
              // Highlight the selected answer
              optionClass = option === currentQuestion.correctAnswer ? 'correct' : 'incorrect';
            } else if (option === currentQuestion.correctAnswer) {
              // Show the correct answer when user selects the wrong one
              optionClass = 'correct';
            }
          }

          return (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`${selectedAnswer === option ? 'selected' : ''} ${optionClass}`}
              style={{ pointerEvents: answered ? 'none' : 'auto' }} // Disable interaction after selecting an answer
            >
              {option}
            </li>
          );
        })}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={answered || !selectedAnswer}>
        {hasNextQuestion(state) ? 'Next Question' : 'Submit'}
      </button>

      {answered && hasNextQuestion(state) && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default Quiz;
