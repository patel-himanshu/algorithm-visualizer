import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-primary text-light sticky-top">
          <div className="navbar-brand font-weight-bold">
            Algorithm Visualizer
          </div>
        </nav>
      </div>
    );
  }
}
