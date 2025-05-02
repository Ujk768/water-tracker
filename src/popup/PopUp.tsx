import React, { useEffect, useState } from "react";
import "./popup.scss";
import img from "../../public/images/water.png";

export default function PopUp() {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  useEffect(() => {
    console.log("Checking if it's the first time...");
    chrome.storage.local.get(["isFirstTime"], (result) => {
      console.log("Storage result:", result);
      if (result.isFirstTime) {
        setIsFirstTime(true);
      }
    });
  }, []);

  const handleSetup = () => {
    chrome.storage.local.set({ isFirstTime: false });
    chrome.runtime.openOptionsPage();
    window.close(); // Close popup after redirection
  };

  return isFirstTime ? (
    <div className="pop-up">
      <h3 className="pop-up__heading">👋 Welcome!</h3>
      <p className="pop-up__heading">Set your daily water goal and reminder preferences.</p>
      <div
        onClick={handleSetup}
        className="pop-up__sign-up"
      >
        Let’s Set It Up
      </div>
    </div>
  ) : (
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
