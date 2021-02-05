import { useState } from "react";
import { validateInput, countBulls, countCows } from "./game";
import "./App.css";

// Referenced React intro notes on Prof. Tuck's scratch repo.
function App() {
  const [secret, setSecret] = useState(newSecret());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Display guesses.
  function guessesTable() {
    return (
      <div>
        {guesses.map((guess, key) => (
          <div key={key}>{guess}</div>
        ))}
      </div>
    );
  }

  // Generate new four digit sequence where each digit is unique.
  function newSecret() {
    let secretSequence = "";
    while (secretSequence.length < 4) {
      let num = Math.floor(Math.random() * Math.floor(10));
      if (secretSequence.indexOf(num.toString()) === -1) {
        secretSequence = secretSequence + num;
      }
    }
    return secretSequence;
  }

  // New game.
  function reset() {
    setSecret(newSecret());
    setGuesses([]);
    setGuess("");
    setGameOver(false);
  }

  // If user hits enters, makes guess.
  function onKeyPress(event) {
    if (event.key === "Enter") {
      makeGuess();
    }
  }

  // Update guess based on user input.
  function updateGuess(event) {
    setGuess(event.target.value);
  }

  // First validate input (has to be four unique digits) then determine whether guess is correct.
  function makeGuess() {
    if (!validateInput(guess)) {
      setGuess("");
    } else {
      // If guess is correct, indicate game over.
      if (guess === secret) {
        setGuesses(guesses.concat(guess + " Bulls 4 Cows 0"));
        setGameOver(true);
      } else {
        // If already guessed 7 times before this guess, indicate game over.
        if (guesses.length >= 7) {
          setGameOver(true);
        }
        let bulls = countBulls(guess, secret);
        let cows = countCows(guess, secret);
        setGuesses(guesses.concat(guess + " Bulls " + bulls + " Cows " + cows));
        setGuess("");
      }
    }
  }

  return (
    <div className="App">
      <h1>Bulls and Cows</h1>
      <h1>{gameOver ? (guess === secret ? "You win!" : "You Lost!") : ""}</h1>
      <p>Guess the four digit sequence. Each digit is unique.</p>
      <p>{!gameOver ? "????" : secret}</p>
      <label>
        Guesses:
        <div>{guessesTable()}</div>
      </label>
      <p>Guesses can only be a sequence of four unique digits.</p>
      <label>
        <input
          type="text"
          value={guess}
          onChange={updateGuess}
          onKeyPress={onKeyPress}
          disabled={gameOver ? "disabled" : ""}
        />
        <button onClick={makeGuess} disabled={gameOver ? "disabled" : ""}>
          Guess
        </button>
      </label>
      <p>Remaining tries: {8 - guesses.length}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
