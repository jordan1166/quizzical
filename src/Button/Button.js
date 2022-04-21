import React from "react";
import "./Button.css";

export default function Button(props) {
  // style the button dynamically based on if isClicked equals true or false
  const styles = props.isClicked
    ? { backgroundColor: "#d6dbf5", border: "none" }
    : { backgroundColor: "#ede6db", border: "1px solid #293264" };
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
