console.log("Hello from background script!");

const defaultSettings = {
  dailyGoal: 2000,
  wakeTime: "07:00",
  sleepTime: "22:00",
  totalWaterIntake: 0,
  goalCompleted: false,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    userSettings: defaultSettings,
    isFirstTime: true,
  });
});

chrome.runtime.onMessage.addListener((message) => {
  try {
    if (message.type === "SETTINGS_UPDATED") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "water-bottle.png",
        title: "✅ Settings Saved",
        message: "Your preferences have been saved successfully.",
        priority: 2,
      });
    }
    if (message.type === "USER_DRANK") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "water-bottle.png",
        title: "💧 Water Intake Updated",
        message: `You have Water Intake has been recorded Successfully. Keep Going !!!`,
        priority: 2,
      });
      chrome.alarms.clear("waterReminder");
      chrome.alarms.create("waterReminder", {
        delayInMinutes: 0.5,
      });
      console.log("Alarm created for water reminder");
    }
  } catch (err) {
    console.error("Error in listner", err);
  }
  return true;
});

const getUserData = async (): Promise<typeof defaultSettings | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userSettings"], (result) => {
      resolve(result.userSettings);
    });
  });
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("Alarm triggered:", alarm.name);

  const userSettings = await getUserData();
  console.log("User settings inside alram list:", userSettings);
  // const now = new Date();
  // const hour = now.getHours();
  // const wakeHour = parseInt(userSettings.wakeTime.split(":")[0], 10);
  // const sleepHour = parseInt(userSettings.sleepTime.split(":")[0], 10);

  // if (hour >= wakeHour && hour < sleepHour) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "water-bottle.png",
    title: "💧 Time to Drink Water",
    message: "Stay hydrated! You're doing great.",
    priority: 2,
  });
});
