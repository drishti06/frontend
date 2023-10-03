import React, { useState } from "react";
import "./Subscribe.css";
import axios from "axios"

const Subscribe = () => {
  const [mailRes,setMailRes] = useState('')
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/mail", { email }) // Adjust the endpoint as needed
      .then((response) => {
        const data = response.data;
        setMailRes(data);
        setEmail('')
        setTimeout(() => {
          setMailRes("");
        }, 5000);

      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="subscribe">
      <div className="sub-content">
        <div className="subscribe-top">
          <h1>Subscribe</h1>
          <span>After Subscription you will get latest updates.</span>
        </div>
        <hr />
        <div className="subscribe-bottom">
          <span>Enter Email address</span>
          <input type="text" placeholder="mail@abc.com" value={email}
            onChange={(e) => setEmail(e.target.value)}  />
          <button onClick={handleSubscribe} style={{color:'white', letterSpacing:'5px', fontSize:'15px'}}>
            Subscribe
          </button>
        <br />

        <p style={{ color: 'red' }}>{mailRes.msg}</p>

        </div>
      </div>
    </div>
  );
};

export default Subscribe;
