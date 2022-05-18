import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "../Components/Study";
import CreateDeck from "../Components/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
