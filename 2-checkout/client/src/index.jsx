import { React, useState } from "react";
import { createRoot } from 'react-dom/client';
import { createPortal } from "react-dom";
import Modal from "./modal.jsx";


function App() {
  const [checkoutModal, setCheckoutModal] = useState(false);

  return (
    <>
    <h1>KW</h1>
    <div id="cart">Cart
      <ul id="cart-items">
        <li className="cart-item">Item1</li>
        <li className="cart-item">Item2</li>
      </ul>
    </div>
    <button onClick={() => setCheckoutModal(true)}>Checkout</button>
    {checkoutModal && createPortal(
      <Modal setCheckoutModal={setCheckoutModal}/>,
      document.getElementById('root')
    )}
    </>
  )
};


//^ Render App
const root = createRoot(document.getElementById("root"));
root.render(<App />);
