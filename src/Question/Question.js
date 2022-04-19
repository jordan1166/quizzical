import React, { useState } from "react";
import "./Question.css";
import Button from "../Button/Button";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [buttons, setButtons] = useState(createButtons());
  function answerButtonClicked(id) {
    console.log(id);
    setButtons((prevState) =>
      prevState.map((button) => {
        // if id's match, create new object with old data and update isClicked property
        return button.id === id
          ? { ...button, isClicked: !button.isClicked }
          : button;
      })
    );
  }
  function createButtons() {
    // create array with four undefined indexes
    // replace undefined with an object at all four indexes
    // these properties will be used to generate Button Components
    const buttonArray = Array(4)
      .fill()
      .map(() => ({
        text: "Hello",
        isClicked: false,
        id: nanoid(),
      }));
    return buttonArray;
  }
  // styles to create horizontal divider line between questions
  const styles = {
    color: "#dbdef0",
    height: 1,
    width: "100%",
    opacity: "0.2",
  };
  return (
    <main className="container">
      <h1 className="question">How would one say goodbye in Spanish?</h1>
      <section className="answers">
        {buttons.map((button) => (
          <Button
            key={button.id}
            text={button.text}
            isClicked={button.isClicked}
            answerButtonClicked={() => answerButtonClicked(button.id)}
          />
        ))}
      </section>
      <hr style={styles} />
    </main>
  );
}
