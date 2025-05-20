import React, { useState } from "react";
import "./options.scss";
import img from "../../public/images/water.png";
import wakey from "../../public/images/get-up.png";
import sleep from "../../public/images/sleep.png";
import { UserSettings } from "@/userTypes";

export default function Options() {
  const [dailyGoal, setDailyGoal] = useState<number>(2000);
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [sleepTime, setSleepTime] = useState<string>("22:00");

  const handleSubmit = () => {
    console.log("handle submit trigger");
    const userSettings: UserSettings = {
      dailyGoal,
      wakeTime,
      sleepTime,
      totalWaterIntake: 0,
      goalCompleted: false,
    };
    chrome.storage.local.set({ userSettings }, () => {
      chrome.runtime.sendMessage({ type: "SETTINGS_UPDATED" });

      // Close the options tab (if opened via chrome.runtime.openOptionsPage)
      setTimeout(() => {
        window.close();
      }, 500);
    });
  };

  return (
    <div className="options">
      <h1 className="options__heading">Daily Water Tracker</h1>
      <div className="options__container">
        <div className="img-sec">
          <img src={img} alt="wakey" height={50} width={50} />
          <img src={wakey} alt="wakey" height={50} width={50} />
          <img src={sleep} alt="wakey" height={50} width={50} />
        </div>
        <div className="content-sec">
          <div className="content-sec__item">
            <div>
              <label className="p-10" htmlFor="dailyGoal">
                Daily Goal (ml):
              </label>
              <input
                type="number"
                id="dailyGoal"
                defaultValue={dailyGoal}
                onChange={(e) => setDailyGoal(+e.target.value)}
              />
            </div>
          </div>
          <div className="content-sec__item">
            <label className="p-10" htmlFor="wakeTime">
              Wake Time:
            </label>
            <input
              type="time"
              id="wakeTime"
              defaultValue={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
            />
          </div>
          <div className="content-sec__item">
            <label className="p-10" htmlFor="wakeTime">
              Sleep Time:
            </label>
            <input
              type="time"
              id="sleepTime"
              defaultValue={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="options__btn-sec">
        <div className="btn" onClick={() => handleSubmit()}>
          Save
        </div>
      </div>
    </div>
  );
}
