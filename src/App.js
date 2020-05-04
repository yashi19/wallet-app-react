import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import {HashRouter, Route} from "react-router-dom";
import Transaction from "./components/Transaction";


function App() {
  return (
      <div className="App">
          <HashRouter basename={process.env.REACT_APP_PUBLIC_URL}>
              <Route path="/" exact component={Dashboard} />
              <Route path="/transactions" component={Transaction} />
          </HashRouter>
      </div>
  );
}

export default App;
