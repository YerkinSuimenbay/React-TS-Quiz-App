import React, { useEffect, useState } from "react";
import { DifficultyEnum, fetchQuizQuestions, QuestionStateType } from "./API";
//components
import QuestionCard from "./components/QuestionCard";
// import './App.css';

export type AnswerObjectType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionStateType[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjectType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const new_questions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      DifficultyEnum.EASY
    );
    setQuestions(new_questions);

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (gameOver) return

    const answer = e.currentTarget.value
    const correct = answer === questions[number].correct_answer
    if (correct) setScore(prev => prev + 1)
    setUserAnswers(prev => [...prev, {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }])

  };

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true)
    else setNumber(prev => number + 1)
  };

  return (
    <div className="App">
      <h1>React-TS Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}
      {!loading &&
        !gameOver &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}
    </div>
  );
};

export default App;
