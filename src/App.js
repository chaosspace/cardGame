import { useState } from "react";
import { Card } from "./component/card";
import "./App.css";
import { useEffect } from "react";

function App() {
  const item = [
    { emoji: "1", id: "1", matchFound: false, selected: false },
    { emoji: "2", id: "2", matchFound: false, selected: false },
    { emoji: "3", id: "3", matchFound: false, selected: false },
    { emoji: "4", id: "4", matchFound: false, selected: false },
    { emoji: "5", id: "5", matchFound: false, selected: false },
    { emoji: "6", id: "6", matchFound: false, selected: false },
    { emoji: "7", id: "7", matchFound: false, selected: false },
    { emoji: "8", id: "8", matchFound: false, selected: false },
  ];
  const [cards, setCards] = useState(item);
  const [firstC, setFirstC] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [secondC, setSecondC] = useState(null);
  const [count, setCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [selected, setSelected] = useState(null)
  function resetCards() {
    let shuffled = [...item, ...item].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }
  function resetChoices() {
    setFirstC(null);
    setSecondC(null);
    setMoves((pre) => pre + 1);
    selected.classList.remove('selected')
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }
  function handleSelection(e) {
    if (firstC) {
      setSecondC(e.target.dataset.id);
    } else {
      setFirstC(e.target.dataset.id);
      e.target.classList.add('selected')
      setSelected(e.target)
    }
  }
  function resetGame() {
    setCount(0);
    setMoves(0);
    resetCards();
  }
  useEffect(() => {
    resetCards();
  }, []);
  useEffect(() => {
    if (!secondC) {
      return;
    }
    if (firstC === secondC) {
      setCount((pre) => {
        if (pre + 1 === 8) {
          setTimeout(() => {
            alert(`you win! totally took ${moves + 1} steps`);
            return resetGame();
          }, 100);
        }
        return pre + 1;
      });
      setCards((pre) => {
        return pre.map((c) => {
          if (c.id === firstC) {
            return { ...c, matchFound: true };
          } else {
            return c;
          }
        });
      });
    }
    setDisabled(true);
    resetChoices();
  }, [firstC, secondC]);
  return (
    <div className="App">
      <h2>Card Game</h2>
      <button onClick={resetGame}>New Game</button>
      <p>Your Score:{count}</p>
      <div className="wrapper">
        {Array.from(cards).map((card, idx) => {
          return (
            <Card
              key={idx}
              card={card}
              disabled={disabled}
              handleSelection={handleSelection}
            />
          );
        })}
      </div>
      <p>Total Moves:{moves}</p>
    </div>
  );
}

export default App;
