import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/flashcards").then((res) => {
      setFlashcards(res.data);
    });
  }, []);

  const addFlashcard = () => {
    axios
      .post("http://localhost:5000/flashcards", { question, answer })
      .then(() => {
        setFlashcards([...flashcards, { question, answer }]);
        setQuestion("");
        setAnswer("");
      });
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const checkAnswer = (userAnswer) => {
    if (userAnswer === flashcards[currentIndex].answer) {
      setScore(score + 1);
    }
    nextCard();
  };

  return (
    <div>
      <h1>Flashcard Quiz App</h1>
      <div>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={addFlashcard}>Add Flashcard</button>
      </div>
      {flashcards.length > 0 && (
        <div>
          <p>{flashcards[currentIndex].question}</p>
          {showAnswer && <p>{flashcards[currentIndex].answer}</p>}
          <button onClick={() => setShowAnswer(true)}>Show Answer</button>
          <button onClick={() => checkAnswer(prompt("Your answer:"))}>
            Submit Answer
          </button>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default App;
