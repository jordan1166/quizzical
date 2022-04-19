import React, { useEffect, useState } from "react";
import "./Question.css";
import Button from "../Button/Button";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [buttons, setButtons] = useState(createButtons());
  // keeps track of the currently selected button by storing it's ID
  const [currentID, setCurrentID] = useState(0);
  useEffect(() => {
    // when the current id changes (when new button is clicked),
    // re-render the 4 buttons so that only the selected button is highlighted
    // the 'isClicked' property is 'false' for all unselected buttons
    setButtons((prevState) =>
      prevState.map((button) => {
        return button.id !== currentID
          ? { ...button, isClicked: false }
          : button;
      })
    );
  }, [currentID]);

  function answerButtonClicked(id) {
    // when button is clicked set current id equal to the button's id
    setCurrentID(id);
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
        {/* each Question component renders it's own set of 4 buttons */}
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
