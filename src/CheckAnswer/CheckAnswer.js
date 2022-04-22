import React from "react";
import "./CheckAnswer.css";

export default function CheckAnswer(props) {
  // run clicked() if 'check answer' button is clicked
  // this will display the user's score and a button to start another quiz
  function clicked() {
    return (
      <div className="check-anwser-container">
        <p className="correct-answer-count">You scored 3/5 correct answers</p>
        <button className="check-answer-button" onClick={props.handleClick}>
          Play Again
        </button>
      </div>
    );
  }
  // display 'check answer' button while waiting for user to finish quiz
  function notClicked() {
    return (
      <div className="check-anwser-container">
        <button className="check-answer-button" onClick={props.handleClick}>
          Check Answer
        </button>
      </div>
    );
  }
  const renderResults = props.checkAnswerButtonClicked
    ? clicked()
    : notClicked();
  return <main className="main-container">{renderResults}</main>;
}
