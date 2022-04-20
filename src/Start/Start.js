import React from "react";
import "./Start.css";

export default function Start(props) {
  return (
    <main className="start-container">
      <h1>Quizzical</h1>
      <p>5 random trivial questions. Can you answer them all correctly?</p>
      <button onClick={props.handleClick}>Start Quiz</button>
    </main>
  );
}
