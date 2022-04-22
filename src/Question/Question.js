import React, { useEffect, useState } from "react";
import "./Question.css";
import Button from "../Button/Button";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [buttons, setButtons] = useState(createButtons());
  // keeps track of the currently selected button by storing it's ID
  const [currentID, setCurrentID] = useState(0);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(false);
  console.log(props.correctAnswer);
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
  function correctAnswerCount(text) {
    // the only questions and answers that are stored in the object are questions that have
    // the correct answer selected
    // if the selected answer is correct, add the question number and answer to
    // correctSelectedAnswers object as a key/value pair
    if (text === props.correctAnswer) {
      props.correctSelectedAnswers[props.questionNumber] = props.correctAnswer;
    } else {
      // if currently selected answer is not correct but the current question
      // is in the correctSelectedAnswers object, that means we originally selected
      // the correct answer but are now selecting another answer that is wrong
      // so delete the question/answer from the correctSelectedAnswers object
      if (props.questionNumber in props.correctSelectedAnswers) {
        props.setCorrectSelectedAnswers((prevState) => {
          delete prevState[props.questionNumber];
          return prevState;
        });
      }
    }
    console.log(props.correctSelectedAnswers);
  }
  function answerButtonClicked(id, text) {
    // when button is clicked set current id equal to the button's id
    setCurrentID(id);
    console.log(text);
    correctAnswerCount(text);
    // check if an answer to current question is in the selectedAnswers object
    if (props.questionNumber in props.selectedAnswers) {
      // if currently selected answer is already a value in the selectedAnswers object
      // that means we are clicking the answer again to deselect it
      // so delete the entire question from the object
      if (props.selectedAnswers[props.questionNumber] === text) {
        props.setSelectedAnswers((prevState) => {
          delete prevState[props.questionNumber];
          return prevState;
        });
      } else {
        // if currently selected answer is not already a value in the selectedAnswers object
        // that means we are just choosing a different answer for the same question
        // so set the currently selected answer as the value to the current question
        props.setSelectedAnswers((prevState) => {
          prevState[props.questionNumber] = text;
          return prevState;
        });
      }
    } else {
      // if an answer to the current question is not in the selectedAnswers object
      // add the key:value pair (questionNumber:text) to the object
      props.setSelectedAnswers((prevState) => {
        prevState[props.questionNumber] = text;
        return prevState;
      });
    }
    console.log(props.selectedAnswers);
    // when answer is selected, save answer to local storage
    localStorage.setItem(`answer ${props.questionNumber}`, text);
    setSelectedCorrectAnswer((prevState) => {
      return text === props.correctAnswer ? true : false;
    });
    setButtons((prevState) =>
      prevState.map((button) => {
        // map through array of button objects
        // if id's match, create new object with old data and update isClicked property
        // this basically re-renders the button components when a new button is clicked
        // the newly clicked button is highlighted while the unclicked buttons
        // are not highlighted
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
      .map((button, index) => ({
        text: props.answers[index],
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
      {/* dangerouslySetInnerHTML is used to render html entities
       in the displayed string/question */}
      <h1
        className="question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></h1>
      <section className="answers">
        {/* each Question component renders it's own set of 4 buttons */}
        {buttons.map((button) => (
          <Button
            key={button.id}
            text={button.text}
            selected={props.selectedAnswer}
            isClicked={button.isClicked}
            answerButtonClicked={() =>
              answerButtonClicked(button.id, button.text)
            }
            selectedCorrectAnswer={selectedCorrectAnswer}
            checkAnswerButtonClicked={props.checkAnswerButtonClicked}
            correctAnswer={props.correctAnswer}
          />
        ))}
      </section>
      <hr style={styles} />
    </main>
  );
}
