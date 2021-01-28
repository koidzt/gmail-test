import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className="navBar">
      <h3>NavBar</h3>
      <ul className="navBar-ul">
        <li>
          <Link to="/compose">
            <p>Compose</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
