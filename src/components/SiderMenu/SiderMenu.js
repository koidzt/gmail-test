import React from 'react';
import { Link } from 'react-router-dom';
import './SiderMenu.css';

function SiderMenu() {
  return (
    <div className="siderMenu">
      <h3>Sider</h3>
      <ul>
        <li>
          <Link to="/inbox">
            <p>Inbox</p>
          </Link>
        </li>
        <li>
          <Link to="/starred">
            <p>Starred</p>
          </Link>
        </li>
        <li>
          <Link to="/trash">
            <p>Trash</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SiderMenu;
