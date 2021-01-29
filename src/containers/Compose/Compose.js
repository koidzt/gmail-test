import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Compose.css';

function Compose() {
  const history = useHistory();
  const [inputForm, setInputForm] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const mockInput = {
    to: 'me@mail.com',
    subject: 'Lorem Ipsum',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere commodo maximus. Mauris elementum sapien sit amet dignissim finibus. Quisque interdum placerat lacus, vel venenatis sapien facilisis sed. Proin ligula nisi, convallis non commodo eget, posuere ut augue. Integer finibus eros neque, gravida congue mauris porta vitae. In ipsum massa, hendrerit ac erat sodales, gravida pharetra nulla. Vestibulum ultrices posuere venenatis. Quisque nec tincidunt est. Phasellus laoreet sapien elit, eu ullamcorper mauris porttitor quis. Aliquam a viverra sapien. Vestibulum porta nibh velit, at scelerisque velit iaculis eget. Quisque sed elit elementum felis lobortis convallis quis consectetur lectus. Maecenas quis porttitor tortor. Quisque interdum consequat augue non condimentum.',
  };
  const handleChangeTo = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputForm({ ...inputForm, to: value });
  };
  const handleChangeSubject = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputForm({ ...inputForm, subject: value });
  };
  const handleChangeMessage = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputForm({ ...inputForm, message: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputForm.to === '') {
      return alert('please enter email to received');
    }

    alert(
      'An essay was submitted: \nTo: ' +
        inputForm.to +
        '\nSubject: ' +
        inputForm.subject +
        '\nMessage: ' +
        inputForm.message
    );
    setInputForm({
      to: '',
      subject: '',
      message: '',
    });
    history.push('/inbox');
  };

  return (
    <form className="compose" onSubmit={handleSubmit}>
      <div className="compose-box">
        <span className="compose-label">To </span>
        <input className="compost-input" value={inputForm.to} onChange={handleChangeTo} />
      </div>
      <div className="compose-box">
        <span className="compose-label">Subject </span>
        <input className="compost-input" value={inputForm.subject} onChange={handleChangeSubject} />
      </div>
      <div className="compose-box">
        <span className="compose-label">Message </span>
        <textarea className="compost-textarea" rows="25" value={inputForm.message} onChange={handleChangeMessage} />
      </div>
      <div className="compose-box-button">
        <button className="compose-button" type="submit">
          SEND
        </button>
      </div>
    </form>
  );
}

export default Compose;
