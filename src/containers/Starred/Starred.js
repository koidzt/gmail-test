import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Starred() {
  const [mail, setMail] = useState([]);

  useEffect(() => {
    fetch('mock/mail.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        setMail(jsonResponse);
      });
  }, []);

  // console.log(mail);

  return (
    <div className="mail-box">
      <table>
        <thead>
          <tr>
            <th>by</th>
            <th>label</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {mail
            .filter((mail) => mail.star === true)
            .map((row) => {
              return (
                <tr>
                  <td style={{ textAlign: 'start' }}>
                    <Link to={`mail/${row.id}`}>{row.by} </Link>
                  </td>
                  <td>{row.tag.map((label) => `#${label} `)}</td>
                  <td>
                    <Link
                      to={`mail/${row.id}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingLeft: '1em',
                      }}
                    >
                      <b style={{ paddingRight: '0.5em' }}>{row.title}</b>
                      <p>{row.message}</p>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Starred;
