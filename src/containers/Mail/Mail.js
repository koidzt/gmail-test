import React, { useState, useEffect } from 'react';
import './Mail.css';
import { useParams } from 'react-router-dom';

function Mail(props) {
  const params = useParams();
  const [mail, setMail] = useState({});
  const [label, setLabel] = useState([]);
  const [folder, setFolder] = useState([]);
  const [isShowLabel, setIsShowLabel] = useState(false);
  const [isShowMove, setIsShowMove] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputCheckbox, setInputCheckbox] = useState([]);
  const [inputRadio, setInputRadio] = useState({});

  useEffect(() => {
    fetch('/mock/mail.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        const fetchMail = jsonResponse.find((mail) => mail.id === Number(params.id));
        setMail(fetchMail);
        setInputCheckbox(fetchMail.tag);
      });

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

    fetch('/mock/folder.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        setFolder(jsonResponse);
      });

    // console.log('mail :', mail, 'label:', label);
  }, []);

  const onHandleChange = (event) => {
    // console.log(event);
    const value = event.target.value;
    setInputText(value);
    console.log(value);
  };

  const createLabel = (event) => {
    event.preventDefault();
    // console.log(event);
    const newLabel = [...label, inputText];
    setLabel(newLabel);
    setInputText('');
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

  const handleChangeRadio = (event) => {
    const value = event.target.value;
    console.log(event);
    setInputRadio(value);
  };

  const applyLabel = (event) => {
    event.preventDefault();
    // console.log(event);
    setMail({ ...mail, tag: inputCheckbox });
    // setMail({
    //   id: mail.id,
    //   by: mail.by,
    //   title: mail.title,
    //   message: mail.message,
    //   folder: mail.folder,
    //   tag: inputCheckbox,
    //   star: mail.star,
    // });
    setIsShowLabel(!isShowLabel);
  };

  const applyMove = (event) => {
    event.preventDefault();
    // console.log(event);
    setMail({ ...mail, folder: inputRadio });

    setIsShowMove(!isShowMove);
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
              setMail({ ...mail, star: !mail.star });
            }}
          >
            {mail.star === true ? 'Y' : 'N'}
          </button>
        </li>
        <li className="navBar-li">
          <span>
            Label
            {isShowLabel && (
              <div className="label">
                <form className="tag-form">
                  <span className="add-label-form">
                    <input className="tag-form-input" value={inputText} onChange={onHandleChange} />
                    <button type="submit" onClick={createLabel}>
                      Create New
                    </button>
                  </span>
                </form>
                <form className="tag-form">
                  {label.map((item) => (
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
                  <button onClick={applyLabel}>Apply</button>
                </form>
              </div>
            )}
          </span>
          <button
            style={{ padding: '1px 5px', marginLeft: '3px' }}
            onClick={() => {
              setIsShowLabel(!isShowLabel);
            }}
          >
            {'>'}
          </button>
        </li>
        <li className="navBar-li">
          <span>
            Move
            {isShowMove && (
              <div className="label">
                <form className="tag-form">
                  {folder.map((item) => (
                    <div className="input-tag">
                      <input
                        type="radio"
                        name="folder"
                        value={item}
                        onChange={handleChangeRadio}
                        defaultChecked={mail.folder === item}
                      />
                      <label>{item}</label>
                    </div>
                  ))}
                  <button onClick={applyMove}>Apply</button>
                </form>
              </div>
            )}
          </span>
          <button
            style={{ padding: '1px 5px', marginLeft: '3px' }}
            onClick={() => {
              setIsShowMove(!isShowMove);
            }}
          >
            {'>'}
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
