import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "xterm/css/xterm.css";

import { NotFound, Main } from "./pages";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
