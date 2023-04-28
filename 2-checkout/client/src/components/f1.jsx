import { useState } from "react";

export default function F1({setCheckoutModal}) {
 const [fadeOut, setFadeOut] = useState(false);



  function handleF1Submit(e) {
    e.preventDefault();
    //^ PATCH req: at good res setFormState to f2, setUserInfo to add data
    console.log('yup');
  }

  return (
  <div id="modal-wrapper" className={fadeOut ? 'fade-out' : ''}>
    <div id="modal">
      <h3>Checkout</h3>
        <form onSubmit={handleF1Submit}>
          <input type="text"/>
          <input type="email"/>
          <input type="password"/>
          <div id="buttons">
            <button onClick={() => {
              setFadeOut(true);
              setTimeout(() => {setCheckoutModal(false)}, 400);}}>Cancel</button>
            <button>Next</button>
          </div>
        </form>
    </div>
  </div>
  )
}