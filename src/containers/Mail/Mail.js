import React, { useState, useEffect } from 'react';
import './Mail.css';
import { useParams } from 'react-router-dom';

function Mail(props) {
  const params = useParams();
  const [mail, setMail] = useState({});
  const [tag, setTag] = useState([]);
  const [isShow, setIsShow] = useState(false);

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
        const findById = jsonResponse.mail.find((mail) => mail.id === Number(params.id));
        console.log('findById', findById);
        setMail(findById);
        setTag(findById.tag);
        console.log('tag', findById.tag);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(tag);
    console.log(value.split(','));
    setTag(value.split(','));
  };

  return (
    <div className="mail">
      <ul className="navBar-ul">
        <li className="navBar-li">Delete</li>
        <li className="navBar-li">
          <span>Fav</span>
          <button
            style={{ margin: '0 5px', padding: '2px 5px' }}
            onClick={() => {
              mail.star = !mail.star;
              setMail({ ...mail });
            }}
          >
            {mail.star === true ? 'Y' : 'N'}
          </button>
        </li>
        <li className="navBar-li">
          <span>
            Label
            {isShow && (
              <div className="label">
                <form className="tag-form">
                  <input className="tag-form-input" defaultValue={tag} onChange={handleChange} />
                </form>
                <ul>
                  {tag.map((label) => (
                    <li className="list-tag">{label}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setIsShow(!isShow);
                  }}
                >
                  Apply
                </button>
              </div>
            )}
          </span>
          <button
            style={{ padding: '1px 5px', marginLeft: '3px' }}
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            >
          </button>
        </li>
      </ul>
      <div className="title">
        <span>{mail.title}</span>
        <span className="tag">{tag.map((label) => `#${label}`)}</span>
      </div>
      <div className="sendBy">{mail.email}</div>
      <div className="message">{mail.message}</div>
    </div>
  );
}

export default Mail;
