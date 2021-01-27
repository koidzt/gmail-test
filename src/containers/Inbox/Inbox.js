import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Inbox() {
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
        setMail(jsonResponse.mail);
      });
  }, []);

  // console.log(mail);

  return (
    <div className="inbox">
      <table>
        <thead>
          <tr>
            <th>email</th>
            <th>label</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {mail
            .filter((mail) => mail.folder === 'inbox')
            .map((row) => {
              return (
                <tr>
                  <td style={{ textAlign: 'start' }}>
                    <Link to={`mail/${row.id}`}>{row.email} </Link>
                  </td>
                  <td>{row.tag.map((label)=>`#${label} `)}</td>
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

export default Inbox;
