import React, { useState, useEffect } from 'react';
import './Mail.css';
import { useParams } from 'react-router-dom';

function Mail(props) {
  const params = useParams();
  const [mail, setMail] = useState({});
  const [label, setLabel] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputCheckbox, setInputCheckbox] = useState([]);

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
        const fatchMail = jsonResponse.find((mail) => mail.id === Number(params.id));
        setMail(fatchMail);
        setInputCheckbox(fatchMail.tag);
      });

    fetch('../mock/label.json', {
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

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   console.log(mail.tag);
  //   console.log(value.split(','));
  //   const newTag = value.split(',');
  //   setMail({
  //     id: mail.id,
  //     by: mail.by,
  //     title: mail.title,
  //     message: mail.message,
  //     folder: mail.folder,
  //     tag: newTag,
  //     star: mail.star,
  //   });
  // };

  const onHandleChange = (event) => {
    // console.log(event);
    const value = event.target.value;
    setInputText(value);
  };

  const createLabel = (event) => {
    event.preventDefault();
    // console.log(event);
    const newLabel = [...label, inputText];
    setLabel(newLabel);
  };

  const handleChangeCheckbox = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (value) {
      setInputCheckbox([...inputCheckbox, name]);
    } else {
      setInputCheckbox(inputCheckbox.filter((item) => item !== name));
    }
  };

  const apply = (event) => {
    event.preventDefault();
    // console.log(event);
    setMail({
      id: mail.id,
      by: mail.by,
      title: mail.title,
      message: mail.message,
      folder: mail.folder,
      tag: inputCheckbox,
      star: mail.star,
    });
    setIsShow(!isShow);
  };

  // console.log(inputCheckbox, mail);

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
                  <span className="add-label-form">
                    <input className="tag-form-input" onChange={onHandleChange} />
                    <button type="submit" onClick={createLabel}>
                      Create New
                    </button>
                  </span>
                </form>
                <form className="tag-form">
                  {typeof label === 'object' &&
                    label.map((item) => (
                      <div className="input-tag">
                        <input
                          type="checkbox"
                          name={item}
                          onChange={handleChangeCheckbox}
                          defaultChecked={mail.tag.find((e) => e === item)}
                        />
                        <label>{item}</label>
                      </div>
                    ))}
                  <button onClick={apply}>Apply</button>
                </form>
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
        <span className="tag">{mail.tag !== undefined && mail.tag.map((item) => `#${item}`)}</span>
      </div>
      <div className="sendBy">{mail.by}</div>
      <div className="message">{mail.message}</div>
    </div>
  );
}

export default Mail;
