import React from "react";
import "./Question.css";

export default function Question() {
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
        <button className="answers--button">Adios</button>
        <button className="answers--button">Hola</button>
        <button className="answers--button">Au Revoir</button>
        <button className="answers--button">Salir</button>
      </section>
      <hr style={styles} />
    </main>
  );
}
