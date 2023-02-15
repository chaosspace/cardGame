import React from "react";
import "./card.css";
import head from "./frontImg.jpg";



export const Card = ({ card, disabled, handleSelection }) => {
  return (
    <button
      className={`cardWrapper ${card.matchFound ? "matched" : ""} ${card.selected?'selected':''}`}
      disabled={disabled}
      onClick={handleSelection}
      data-id={card.id}
    >
      <div className="side front">
        <img src={head} alt="head" width={"60px"} />
      </div>
      <div className="side back">
        {card.emoji}
      </div>
    </button>
  );
};
