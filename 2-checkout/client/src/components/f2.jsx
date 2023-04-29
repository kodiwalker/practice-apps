import { useState, useEffect } from "react";
import axios from "axios";

export default function F2({setFormState, userInfo, setUserInfo}) {
  const [addressText, setAddressText] = useState('');
  const [cityText, setCityText] = useState('');
  const [stateText, setStateText] = useState('');
  const [zipText, setZipText] = useState('');
  const [phoneText, setPhoneText] = useState('');

  useEffect(() => {
    setAddressText(userInfo.address || '');
    setCityText(userInfo.city || '');
    setStateText(userInfo.state || '');
    setZipText(userInfo.zip || '');
    setPhoneText(userInfo.phone || '');
  }, [userInfo])

  function handleF2Submit(e) {
    e.preventDefault();
    const f2Info = {
      address: addressText,
      city: cityText,
      state: stateText,
      zip: zipText,
      phone: phoneText,
      f2complete: 1
    }
    axios.patch('/checkout/f2', f2Info)
      .then((response) => {
        setUserInfo({...userInfo, ...f2Info});
        setFormState('f3');
      })
      .catch ((err) => {
        console.error('PATCH failed:', err);
        alert('Cannot continue. Please refresh and try again.');
      })
  };


  return (
  <form onSubmit={handleF2Submit}>

    <div className="label-input">
      <label htmlFor="address">Address</label>
      <input required type="text" name="address" value={addressText} 
      onChange={(e) => setAddressText(e.target.value)}/>
    </div>

    <div className="label-input">
      <label htmlFor="city">City</label>
      <input required type="text" name="city" value={cityText} 
      onChange={(e) => setCityText(e.target.value)}/>
    </div>

  <div className="two-inputs">
    <div className="label-input">
      <label htmlFor="state">State</label>
      <input required size="2" type="text" name="state" value={stateText} 
      onChange={(e) => setStateText(e.target.value)}/>
    </div>

    <div className="label-input">
      <label htmlFor="zip">Zip</label>
      <input required size="5" type="postal" name="zip" value={zipText} 
      onChange={(e) => setZipText(e.target.value)}/>
    </div>
  </div>

    <div className="label-input">
      <label htmlFor="phone">Phone</label>
      <input required type="tel" name="phone" value={phoneText} 
      onChange={(e) => setPhoneText(e.target.value)}/>
    </div>

    <div id="buttons">
      <button onClick={(e) => {
        e.preventDefault();
        setFormState('f1');
        }}>Go Back</button>
      <button>Next</button>
    </div>

  </form>
  )
}