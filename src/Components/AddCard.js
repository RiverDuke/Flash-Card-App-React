import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

export default function AddCard() {
  const initialState = {
    front: "",
    back: "",
  };

  const [data, setData] = useState({ ...initialState });
  const { params } = useRouteMatch();
  const [deck, setDeck] = useState({ cards: [] });
  const ac = new AbortController();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(params.deckId, ac.signal);
      setDeck(() => response);
    }
    getDeck();
    return () => ac.abort();
  }, [deck]);

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const ac = new AbortController();

    createCard(params.deckId, data, ac.signal)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    setData({ ...initialState });
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${params.deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {"Add Card"}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            placeholder="Front side of card"
            rows="3"
            name="front"
            onChange={handleChange}
            value={data.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            placeholder="Back side of card"
            rows="3"
            name="back"
            onChange={handleChange}
            value={data.back}
          />
        </div>
        <Link to={`/decks/${params.deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
