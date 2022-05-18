import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Card({ deck }) {
  const [current, setCurrent] = useState(0);
  const card = deck.cards[current] || {};
  const [toggle, setToggle] = useState(false);
  const [display, setDisplay] = useState("");
  const [nextBtn, setNextBtn] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setDisplay(card.front);
  }, [deck, current]);

  function flipHandler(event) {
    setToggle(!toggle);
    if (toggle) {
      console.log(toggle);
      setDisplay(card.front);
      setNextBtn(null);
    } else {
      console.log(toggle);
      setDisplay(card.back);
      setNextBtn(
        <button
          type="button"
          className="btn btn-primary ml-3"
          onClick={nextHandler}
        >
          Next
        </button>
      );
    }
  }

  function nextHandler(event) {
    if (current + 1 === deck.cards.length) {
      if (
        window.confirm(
          "Restart Cards? \n \n Click 'cancel' to return to the home page."
        )
      ) {
        console.log("hello");
        setCurrent(0);
        setDisplay(card.front);
        setNextBtn(null);
        setToggle(false);
        return;
      } else {
        history.push("/");
      }
    }
    setCurrent(() => current + 1);
    setDisplay(card.front);
    setNextBtn(null);
    setToggle(false);
  }

  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">{`Card ${current + 1} of ${
          deck.cards.length
        }`}</h5>
        <p className="card-text">{display}</p>
        <button
          type="button"
          onClick={flipHandler}
          className="btn btn-secondary"
        >
          Flip
        </button>
        {nextBtn}
      </div>
    </div>
  );
}
