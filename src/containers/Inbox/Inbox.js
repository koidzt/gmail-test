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
        setMail(jsonResponse);
      });
  }, []);

  // console.log(mail);

  return (
    <div className="inbox">
      <table>
        <thead>
          <tr>
            <th>Fav</th>
            <th>by</th>
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
                  <td
                    style={{
                      height: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      style={{ padding: '2px 5px' }}
                      onClick={() => {
                        mail[row.id - 1].star = !mail.find((item) => item.id === row.id).star;
                        setMail([...mail]);
                      }}
                    >
                      {row.star === true ? 'Y' : 'N'}
                    </button>
                  </td>
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

export default Inbox;
