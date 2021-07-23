import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddOntologyComponent from "./components/AddOntologyComponent";
import OntologyComponent from "./components/OntologyComponent";
import OntologyListComponent from "./components/OntologyListComponent";

function App() {
  return (
      <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/ontologies"} className="navbar-brand">
                  React Ontology Client
              </Link>
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/ontologies"} className="nav-link">
                          Ontologies
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/create"} className="nav-link">
                          Create new
                      </Link>
                  </li>
              </div>
          </nav>

          <div className="container mt-3">
              <Switch>
                  <Route exact path={["/", "/ontologies"]} component={OntologyListComponent} />
                  <Route exact path="/create" component={AddOntologyComponent} />
                  <Route path="/ontologies/:id" component={OntologyComponent} />
              </Switch>
          </div>
      </div>
  );
}

export default App;
