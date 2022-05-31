import { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
export default function EditCard() {
  const [deck, setDeck] = useState({});
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
    readDeck(params.deckID, ac.signal).then((response) => {
      setDeck(response);
      setForm(response);
    });
  }, []);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  function handleSubmit() {
    updateDeck(form, ac.signal);
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
            <Link to={`decks/${params.deckIDid}`}>hello</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Front</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Back</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            name="description"
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <Link to={`/decks/${form.id}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
