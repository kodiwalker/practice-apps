import { useState, useEffect } from "react";
import axios from "axios";

// TODO Use alert for order complete
export default function Summary({setFormState, userInfo, setUserInfo}) {

  function handleSubmit(e) {
    e.preventDefault();
    const summaryInfo = {
      purchased: 1
    }
    axios.patch('/checkout/summary', summaryInfo)
      .then((response) => {
        setUserInfo({...userInfo, ...summaryInfo});
        setFormState('complete');
      })
      .catch ((err) => {
        console.error('PATCH failed:', err);
        alert('Cannot continue. Please refresh and try again.');
      })
  };


  return (
        <form onSubmit={handleSubmit}>
<ul>
          <li>Full Name: {userInfo.name}</li>
          <li>Email: {userInfo.email}</li>
          <li>Address: {userInfo.address}</li>
      <div className="two-inputs">
          <li>City: {userInfo.city}</li>
          <li>State: {userInfo.state}</li>
      </div>
          <li>Zip: {userInfo.zip}</li>
          <li>Phone: {userInfo.phone}</li>
          <li>Card Number: {userInfo.cardnum}</li>
      <div className="two-inputs">
          <li>Expiry: {userInfo.cardexp}</li>
          <li>CVV: {userInfo.cardcvv}</li>
      </div>
          <li>Billing Zip: {userInfo.cardzip}</li>
</ul>

          <div id="buttons">
            <button onClick={(e) => {
              e.preventDefault();
              setFormState('f3');
              }}>Go Back</button>
            <button>Complete Purchase</button>
          </div>

        </form>
  )
}