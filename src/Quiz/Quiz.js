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
    const results = data.results;
    // store each question and its answers in local storage
    // shuffle the answers using the shuffle array
    // questions and answers are stored in local storage so the answers don't get
    // reshuffled when the 'check answer' button is clicked
    results.forEach((result, index) => {
      localStorage.setItem(
        `result ${index}`,
        JSON.stringify(
          shuffleArray([...result.incorrect_answers, result.correct_answer])
        )
      );
    });
    // after questions are received, load questions into state, re-render Quiz component
    setQuestions(data);
  }
  // shuffle answer array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      {/* If questionData array length is 0, then getQuestions() has not finished fetching the data so 'Loading..' should be passed as a prop */}
      {questionArray.map((question, index) => (
        <Question
          question={
            question.questionData.length !== 0
              ? question.questionData.results[index].question
                  .replace(/&quot;/g, '"')
                  .replace(/&#039;/g, "'")
                  .replace(/&amp;/g, "&")
                  .replace(/&divide;/g, "/")
                  .replace(/&eacute;/g, "e")
              : "Loading.."
          }
          answers={
            JSON.parse(localStorage.getItem(`result ${index}`)).length !== 0
              ? JSON.parse(localStorage.getItem(`result ${index}`))
              : Array(4).fill("Loading..")
          }
          key={question.id}
        />
      ))}
      <CheckAnswer buttonClicked={buttonClicked} handleClick={handleClick} />
    </main>
  );
}
