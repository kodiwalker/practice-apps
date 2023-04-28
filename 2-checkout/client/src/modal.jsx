import { useState } from "react";
import F1 from "./components/f1.jsx";
import F2 from "./components/f2.jsx";
import F3 from "./components/f3.jsx";
import Summary from "./components/summary.jsx";

export default function Modal({setCheckoutModal}) {
  const [formState, setFormState] = useState('f1');
  const [userInfo, setUserInfo] = useState({});

  if (formState === 'f1') {
    return (
      <F1 setCheckoutModal={setCheckoutModal}/>
    )
  } else if (formState === 'f2') {
    return (
      <F2 />
    )
  } else if (formState === 'f3') {
    return (
      <F3 />
    )
  } else {
    return (
      <Summary />
    )
  }

}