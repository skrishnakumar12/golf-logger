import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <h4 className="navbar-brand">
        Golf Logger App
      </h4>
      <button onClick={this.editScore}> Add Score</button>
    </nav>
  );
}

export default NavBar;