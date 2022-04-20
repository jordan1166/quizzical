import React, { useState } from "react";
import "./Quiz.css";
import Question from "../Question/Question";
import CheckAnswer from "../CheckAnswer/CheckAnswer";

export default function Quiz(props) {
  const [buttonClicked, setButtonClicked] = useState(false);
  function handleClick() {
    setButtonClicked((prevState) => !prevState);
  }
  return (
    <main className="questions-container">
      <Question />
      <Question />
      <Question />
      <Question />
      <Question />
      <CheckAnswer buttonClicked={buttonClicked} handleClick={handleClick} />
    </main>
  );
}
