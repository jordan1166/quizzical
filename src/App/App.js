import "./App.css";
import Start from "../Start/Start";
import Quiz from "../Quiz/Quiz";
import { useState } from "react";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  // function passed as prop to the Start component
  // When Start Quiz button is pressed, startQuiz state is changed from false to true
  function handleClick() {
    setStartQuiz(true);
  }
  // if startQuiz state equals 'true', render Quiz component
  // if startQuiz state equals 'false', render Start component
  return (
    <div>{startQuiz ? <Quiz /> : <Start handleClick={handleClick} />}</div>
  );
}
