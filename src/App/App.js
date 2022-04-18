import "./App.css";
import Start from "../Start/Start";
import Quiz from "../Quiz/Quiz";
import { useState } from "react";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(true);
  return <div>{startQuiz ? <Quiz /> : <Start />}</div>;
}
