import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Trash() {
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
    <div className="trash">
      <table>
        <thead>
          <tr>
            {/* <th>select</th> */}
            <th>by</th>
            <th>label</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {mail
            .filter((mail) => mail.folder === 'trash')
            .map((row) => {
              return (
                <tr>
                  {/* <td>
                    <input type="checkbox" id={row.id} style={{ height: '20px', width: '20px' }}></input>
                  </td> */}
                  <td style={{ textAlign: 'start' }}>
                    <Link to={`mail/${row.id}`}>{row.by} </Link>
                  </td>
                  <td style={{ paddingLeft: '0.5em' }}>{row.tag.map((label) => `#${label} `)}</td>
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

export default Trash;
