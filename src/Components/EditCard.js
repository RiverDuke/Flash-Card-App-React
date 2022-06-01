import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
export default function EditCard() {
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };

  const [form, setForm] = useState(initialState);
  const { params, url } = useRouteMatch();

  let pagetitle = "Add Card";
  if (url.includes("edit")) {
    pagetitle = "Edit Card";
  }

  useEffect(() => {
    const ac = new AbortController();
    readDeck(params.deckId, ac.signal).then((response) => {
      setDeck(response);
      if (url.includes("edit")) {
        readCard(params.cardId, ac.signal).then((response) => {
          setForm(response);
        });
      }
    });
  }, [params.deckId, params.cardId]);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  function handleSubmit() {
    updateCard(form);
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
            {pagetitle}
          </li>
        </ol>
      </nav>
      <h1>{pagetitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <input
            type="text"
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
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
            placeholder="Back side of card"
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
