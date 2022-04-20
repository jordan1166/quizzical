import React from "react";
import "./Quiz.css";
import Question from "../Question/Question";
import CheckAnswer from "../CheckAnswer/CheckAnswer";

export default function Quiz(props) {
  return (
    <main className="questions-container">
      <Question />
      <Question />
      <Question />
      <Question />
      <Question />
      <CheckAnswer />
    </main>
  );
}
