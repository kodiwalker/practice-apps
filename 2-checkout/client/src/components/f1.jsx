import { useState, useEffect } from "react";
import axios from "axios";

export default function F1({setCheckoutModal, setFormState, userInfo, setUserInfo, setFadeOut}) {
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  useEffect(() => {
    setNameText(userInfo.name || '');
    setEmailText(userInfo.email || '');
    setPasswordText(userInfo.password || '');
  }, [userInfo])

  function handleF1Submit(e) {
    e.preventDefault();
    const f1Info = {
      name: nameText,
      email: emailText,
      password: passwordText,
      f1complete: 1
    }
    axios.patch('/checkout/f1', f1Info)
      .then((response) => {
        setUserInfo({...userInfo, ...f1Info});
        setFormState('f2');
      })
      .catch ((err) => {
        console.error('PATCH failed:', err);
        alert('Cannot continue. Please refresh and try again.');
      })
  };


  return (
  <form onSubmit={handleF1Submit}>

    <div className="label-input">
      <label htmlFor="fullname">Full Name</label>
      <input required type="text" name="fullname" value={nameText} onChange={(e) => setNameText(e.target.value)}/>
    </div>

    <div className="label-input">
    <label htmlFor="email">Email</label>
    <input required type="email" name="email" value={emailText} onChange={(e) => setEmailText(e.target.value)}/>
    </div>

    <div className="label-input">
    <label htmlFor="password">Password</label>
    <input required type="password" name="password" value={passwordText} onChange={(e) => setPasswordText(e.target.value)}/>
    </div>

    <div id="buttons">
      <button onClick={(e) => {
        e.preventDefault();
        setFadeOut(true);
        setTimeout(() => {setCheckoutModal(false)}, 400);}}>Cancel</button>
      <button>Next</button>
    </div>

  </form>
  )
}