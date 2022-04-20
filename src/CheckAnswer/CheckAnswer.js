import React from "react";
import "./CheckAnswer.css";

export default function CheckAnswer() {
  return (
    <main className="check-anwser-container">
      <p className="correct-answer-count">You scored 3/5 correct answers</p>
      <button className="check-answer-button">Check Answer</button>
    </main>
  );
}
