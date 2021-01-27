import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Mail(props) {
  const [mail, setMail] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch('../mock/mail.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        const filterById = jsonResponse.mail.filter((mail) => mail.id === Number(params.id));
        setMail({
          id: filterById[0].id,
          email: filterById[0].email,
          title: filterById[0].title,
          message: filterById[0].message,
          folder: filterById[0].folder,
          tag: filterById[0].tag,
        });
      });
  }, []);

  return (
    <div className="mail" style={{ textAlign: 'start' }}>
      <div className="title">{mail.title}</div>
      <div className="sendBy">{mail.email}</div>
      <div className="message">{mail.message}</div>
    </div>
  );
}

export default Mail;
