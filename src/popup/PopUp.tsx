import React, { useEffect, useState } from "react";
import "./popup.scss";
import img from "../../public/images/water.png";
import { calulateHourlyWaterIntake } from "@/waterCalculationFunctions";

export default function PopUp() {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
  const [waterDrankTillNow, setWaterDrankTillNow] = useState(0);
  const [hourlyWaterNeeded, setHourlyWaterNeeded] = useState(0);
  const [waterDrankTillNowPercent, setWaterDrankTillNowPercent] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    console.log("Checking if it's the first time...");
    chrome.storage.local.get(["isFirstTime"], (result) => {
      console.log("Storage result:", result);
      if (result.isFirstTime) {
        setIsFirstTime(true);
      }
    });
    if (!isFirstTime) {
      chrome.storage.local.get(["userSettings"], (result) => {
        console.log("Storage result:", result);
        if (result.userSettings) {
          setUserDetails(result.userSettings);
          setDailyGoal(result.userSettings.dailyGoal);
          setWaterDrankTillNow(result.userSettings.totalWaterIntake || 0);
          setHourlyWaterNeeded(
            calulateHourlyWaterIntake(
              result.userSettings.wakeTime,
              result.userSettings.sleepTime,
              result.userSettings.dailyGoal
            )
          );
          setWaterDrankTillNowPercent(
            ((result.userSettings.totalWaterIntake || 0) /
              result.userSettings.dailyGoal) *
              100
          );
        }
      });
    }
  }, [isFirstTime]);

  const handleWaterDrank = async () => {
    console.log("Water drank button clicked!");
    waterDrankTillNow >= dailyGoal
      ? ""
      : setWaterDrankTillNow((prev) => prev + hourlyWaterNeeded);
    setWaterDrankTillNowPercent(
      ((waterDrankTillNow + hourlyWaterNeeded) / dailyGoal) * 100
    );
    // Update the total water intake in storage
    const updatedObject = {
      ...userDetails,
      totalWaterIntake: waterDrankTillNow + hourlyWaterNeeded,
    };
    setUserDetails(updatedObject);
    chrome.storage.local.set({
      userSettings: updatedObject,
    });

    await chrome.runtime.sendMessage({ type: "USER_DRANK", multiplier: 2 });
  };

  const handleSetup = () => {
    chrome.storage.local.set({ isFirstTime: false });
    chrome.runtime.openOptionsPage();
    window.close(); // Close popup after redirection
  };

  return isFirstTime ? (
    <div className="pop-up">
      <h3 className="pop-up__heading">👋 Welcome!</h3>
      <p className="pop-up__heading">
        Set your daily water goal and reminder preferences.
      </p>
      <div onClick={handleSetup} className="pop-up__sign-up">
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
              conic-gradient(#4CC9FE ${waterDrankTillNowPercent}%, #D4F6FF 0)`,
            }}
          >
            <img src={img} alt="placeholder" />
          </div>
        </div>
        <div className="right-sec">
          <h2>Total Goal Achived</h2>
          <h3>
            {waterDrankTillNow} / {dailyGoal} ml
          </h3>
          <div>
            <button onClick={handleWaterDrank}>
              Add {hourlyWaterNeeded} ml
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
