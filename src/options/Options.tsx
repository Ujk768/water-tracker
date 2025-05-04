import React from "react";
import "./options.scss";
import img from "../../public/images/water.png";
import wakey from "../../public/images/get-up.png";
import sleep from "../../public/images/sleep.png";

export default function Options() {
  return (
    <div className="options">
      <h1 className="options__heading">Daily Water Tracker</h1>
      <div className="options__container">
        <div className="img-sec">
          <img src={img} alt="wakey" height={50} width={50} />
          <img src={wakey} alt="wakey" height={50} width={50}/>
          <img src={sleep} alt="wakey" height={50} width={50} />
        </div>
        <div className="content-sec">
          <div className="content-sec__item">
            <div>
            <label className="p-10" htmlFor="dailyGoal">Daily Goal (ml):</label>
            <input type="number" id="dailyGoal" defaultValue={2000} />
            </div>
          </div>
          <div className="content-sec__item">
            <label className="p-10" htmlFor="wakeTime">Wake Time:</label>
            <input type="time" id="wakeTime" defaultValue="07:00" />
          </div>
          <div className="content-sec__item">
            <label className="p-10" htmlFor="wakeTime">Sleep Time:</label>
            <input type="time" id="wakeTime" defaultValue="07:00" />
          </div>
        </div>
      </div>
      <div className="options__btn-sec">
          <button>Save</button>
        </div>
    </div>
  );
}