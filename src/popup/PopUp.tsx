import React from "react";
import "./popup.scss";
import img from "../../public/images/water.png";

export default function PopUp() {

  return (
    <div className="pop-up">
      <div className="pop-up__container">
        <div className="left-sec">
          <div
            className="left-sec__progress"
            style={{
              background: `radial-gradient(closest-side, #222831 79%, transparent 80% 100%),
                conic-gradient(#4CC9FE 75%, #D4F6FF 0)`,
            }}
          >
            <img src={img} alt="placeholder" />
          </div>
        </div>
        <div className="right-sec">
          <h2>Total Goal Achived</h2>
          <h3>500 ml / 2000ml</h3>
          <div>
            <button>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
