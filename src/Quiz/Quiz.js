import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "../Question/Question";
import CheckAnswer from "../CheckAnswer/CheckAnswer";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [questions, setQuestions] = useState([]);
  function handleClick() {
    setButtonClicked((prevState) => !prevState);
  }
  useEffect(() => {
    getQuestions();
  }, []);
  // get 5 multiple choices questions from API
  async function getQuestions() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await response.json();
    // after questions are received, load questions into state, re-render Quiz component
    setQuestions(data);
  }
  // create array with 5 question objects
  const questionArray = Array(5)
    .fill()
    .map(() => ({
      questionData: questions,
      id: nanoid(),
    }));
  return (
    <main className="questions-container">
      {/* create five question components and give each question component one question from the five questions retrieved from the API */}
      {/* If questions are finished being fetched from API, pass questions as props to Question components. */}
      {questionArray.map((question, index) => (
        <Question
          question={
            question.questionData.length !== 0
              ? question.questionData.results[index].question
              : "Loading"
          }
          key={question.id}
        />
      ))}
      <CheckAnswer buttonClicked={buttonClicked} handleClick={handleClick} />
    </main>
  );
}
