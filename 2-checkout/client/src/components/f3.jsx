import { useState, useEffect } from "react";
import axios from "axios";

export default function F3({setFormState, userInfo, setUserInfo}) {
  const [cardText, setCardText] = useState('');
  const [expText, setExpText] = useState('');
  const [cvvText, setCvvText] = useState('');
  const [cardZipText, setCardZipText] = useState('');

  useEffect(() => {
    setCardText(userInfo.cardnum || '');
    setExpText(userInfo.cardexp || '');
    setCvvText(userInfo.cardcvv || '');
    setCardZipText(userInfo.cardzip || '');
  }, [userInfo])

  function handleF3Submit(e) {
    e.preventDefault();
    const f3Info = {
      cardnum: cardText,
      cardexp: expText,
      cardcvv: cvvText,
      cardzip: cardZipText,
      f3complete: 1
    }
    axios.patch('/checkout/f3', f3Info)
      .then((response) => {
        setUserInfo({...userInfo, ...f3Info});
        setFormState('summary');
      })
      .catch ((err) => {
        console.error('PATCH failed:', err);
        alert('Cannot continue. Please refresh and try again.');
      })
  };


  return (
        <form onSubmit={handleF3Submit}>

    <div className="label-input">
          <label htmlFor="cardnum">Card Number</label>
          <input required type="text" name="cardnum" value={cardText} 
          onChange={(e) => setCardText(e.target.value)}/>
    </div>

  <div className="two-inputs">
    <div className="label-input">
          <label htmlFor="exp">Expiry</label>
          <input required size="8" type="text" name="exp" value={expText} 
          onChange={(e) => setExpText(e.target.value)}/>
    </div>

    <div className="label-input">
          <label htmlFor="cvv">CVV</label>
          <input required size="3" type="password" name="cvv" value={cvvText} 
          onChange={(e) => setCvvText(e.target.value)}/>
    </div>
  </div>

    <div className="label-input">
          <label htmlFor="cardzip">Billing Zip</label>
          <input required size="5" type="postal" name="cardzip" value={cardZipText} 
          onChange={(e) => setCardZipText(e.target.value)}/>
    </div>

          <div id="buttons">
            <button onClick={(e) => {
              e.preventDefault();
              setFormState('f2');
              }}>Go Back</button>
            <button>Next</button>
          </div>

        </form>
  )
}