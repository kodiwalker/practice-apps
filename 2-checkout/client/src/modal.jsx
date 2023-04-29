import { useState, useEffect } from "react";
import axios from "axios";
import F1 from "./components/f1.jsx";
import F2 from "./components/f2.jsx";
import F3 from "./components/f3.jsx";
import Summary from "./components/summary.jsx";

export default function Modal({setCheckoutModal}) {
  const [formState, setFormState] = useState('f1');
  const [userInfo, setUserInfo] = useState({});
  const [fadeOut, setFadeOut] = useState(false);


  //^ Initial GET at createPortal
  useEffect(() => {
    axios.get('/checkout')
      .then((response) => {
        setUserInfo(response.data);
        if (response.data.purchased) {
          setFormState('complete')
        } else if (response.data.f3complete) {
          setFormState('summary')
        } else if (response.data.f2complete) {
          setFormState('f3')
        } else if (response.data.f1complete) {
          setFormState('f2')
        } else {
          setFormState('f1')
        }
      })
      .catch((err) => {
        console.error('Initial GET failed:', err)
      })
  }, []);


  if (formState === 'f2') {
    return (
      <div id="modal-wrapper">
        <div id="modal">
          <h3>Checkout</h3>
          <F2 setFormState={setFormState} userInfo={userInfo} setUserInfo={setUserInfo}/>
        </div>
      </div>
    )
  } else if (formState === 'f3') {
    return (
      <div id="modal-wrapper">
        <div id="modal">
          <h3>Checkout</h3>
          <F3 setFormState={setFormState} userInfo={userInfo} setUserInfo={setUserInfo}/>
        </div>
      </div>
    )
  } else if (formState === 'summary') {
    return (
      <div id="modal-wrapper">
        <div id="modal">
          <h3>Checkout</h3>
          <Summary setFormState={setFormState} userInfo={userInfo} setUserInfo={setUserInfo}/>
        </div>
      </div>
    )
  } else if (formState === 'complete') {
    return (
      <div id="modal-wrapper" className={fadeOut ? 'fade-out' : ''}>
        <div id="modal">
          <h3>Checkout Complete</h3>
          <p>Thanks for your order!</p>
          <p>✨💍✨</p>
          <button onClick={(e) => {
              e.preventDefault();
              setFadeOut(true);
              setTimeout(() => {setCheckoutModal(false)}, 400);}}>Close</button>
        </div>
      </div>
    )
  } else {
    return (
      <div id="modal-wrapper" className={fadeOut ? 'fade-out' : ''}>
        <div id="modal">
          <h3>Checkout</h3>
          <F1 setCheckoutModal={setCheckoutModal} setFormState={setFormState} userInfo={userInfo} setUserInfo={setUserInfo} setFadeOut={setFadeOut}/>
        </div>
      </div>
    )
  }

}