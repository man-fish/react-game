import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";

import "./assets/css/reset.css";
import "./assets/css/App.css";
import "./assets/css/public/index.scss";

import Header from "./common/header/index";
import Home from "./pages/home";
import Games from "./pages/game";
import Apps from "./pages/app";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="g-container">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/game" component={Games}></Route>
                        <Route path="/app" component={Apps}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
