import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "./Card";

export default function Study() {
  const { url, params } = useRouteMatch();
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

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Study</h1>
      <Card deck={deck} />
    </>
  );
}
