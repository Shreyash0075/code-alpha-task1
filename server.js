const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/flashcards", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
});
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

app.get("/flashcards", async (req, res) => {
  const flashcards = await Flashcard.find();
  res.json(flashcards);
});

app.post("/flashcards", async (req, res) => {
  const { question, answer } = req.body;
  const newFlashcard = new Flashcard({ question, answer });
  await newFlashcard.save();
  res.json(newFlashcard);
});

app.listen(5000, () => console.log("Server running on port 5000"));
