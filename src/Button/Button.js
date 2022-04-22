import React, { useEffect } from "react";
import "./Button.css";

export default function Button(props) {
  let styles;
  // style the button dynamically based on if isClicked equals true or false
  if (props.selectedCorrectAnswer) {
    console.log("Correct!");
  }
  // if 'check answer' button is clicked, highlight selected answers in green
  if (props.checkAnswerButtonClicked) {
    styles =
      props.selected === props.text
        ? { backgroundColor: "#94d7a2", border: "none" }
        : { backgroundColor: "#ede6db", border: "1px solid #293264" };
  } else {
    // when an 'answer button' is clicked during the quiz, highlight that button in a blue-ish color
    styles = props.isClicked
      ? { backgroundColor: "#d6dbf5", border: "none" }
      : { backgroundColor: "#ede6db", border: "1px solid #293264" };
  }

  /* dangerouslySetInnerHTML is used to render html entities
       in the displayed button text */
  return (
    <button
      className="answers--button"
      onClick={props.answerButtonClicked}
      style={styles}
      dangerouslySetInnerHTML={{ __html: props.text }}
    ></button>
  );
}
