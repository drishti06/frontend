import React from "react";
import "./HowCompanyWorks.css";
import girlSinger from "../../images/girl-singing.jpg";
import taylorSwift from "../../images/taylor-swift.jpg";

const HowCompanyWorks = () => {
  return (
    <>
      <div className="company-works">
        <div className="company-works-left">
          <div>
          <h1 style={{fontSize:"30px"}}>How Company Works?</h1>
          <ul>
            <li>
              Get new credits every month to purchase samples, presets, and MIDI.
            </li>
            <li>
              1 sample = 1 credit. Presets and MIDI cost between 1-3 credits.
            </li>
            <li>
              Unused credits roll over to the next month.
            </li>
          </ul>
          </div>
          <div className="taylor-swift">
            <img src={taylorSwift} alt="" />
          </div>
        </div>
        <div className="company-works-right">
          <img src={girlSinger} alt="" />
        </div>
      </div>
    </>
  );
};

export default HowCompanyWorks;
