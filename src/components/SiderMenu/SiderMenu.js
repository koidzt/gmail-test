import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SiderMenu.css';

function SiderMenu() {
  const [label, setLabel] = useState([]);

  useEffect(() => {
    fetch('/mock/label.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        setLabel(jsonResponse);
      });

    // console.log('mail :', mail, 'label:', label);
  }, []);

  console.log(label);

  return (
    <div className="siderMenu">
      <h3>Sider</h3>
      <ul>
        <div style={{ borderTop: '1px solid lightgrey', padding: '16px 0' }}>
          <li>
            <Link to="/">
              <p>All Mail</p>
            </Link>
          </li>
          <li>
            <Link to="/starred">
              <p>Starred</p>
            </Link>
          </li>
        </div>
        <div style={{ borderTop: '1px solid lightgrey', padding: '16px 0' }}>
          <span>Folder</span>
          <li>
            <Link to="/inbox">
              <p>Inbox</p>
            </Link>
          </li>
          <li>
            <Link to="/trash">
              <p>Trash</p>
            </Link>
          </li>
        </div>
        <div style={{ borderTop: '1px solid lightgrey', padding: '16px 0' }}>
          <span>Tag</span>
          {label.map((item) => (
            <li>
              <Link to={`/tag/${item}`}>
                <p>{item}</p>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default SiderMenu;
