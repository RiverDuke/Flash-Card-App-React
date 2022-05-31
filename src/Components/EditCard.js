import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard, updateDeck } from "../utils/api";
export default function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };

  //   console.log(deck);
  const [form, setForm] = useState(initialState);
  const { params, url } = useRouteMatch();

  const ac = new AbortController();
  useEffect(() => {
    readDeck(params.deckId, ac.signal)
      .then((response) => {
        setDeck(response);
        return readCard(params.cardId, ac.signal);
      })
      .then((response) => {
        console.log(response);
        setForm(response);
      });
  }, []);
  console.log(form);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  function handleSubmit() {
    updateCard(form, ac.signal);
    history.push(`decks/${form.id}`);
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`decks/${params.deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <input
            type="text"
            className="form-control"
            id="front"
            name="front"
            onChange={handleChange}
            value={form.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Back</label>
          <textarea
            className="form-control"
            id="back"
            rows="4"
            name="back"
            onChange={handleChange}
            value={form.back}
          />
        </div>
        <Link to={`/decks/${params.deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
