console.log("Hello from background script!"); 
const defaultSettings = {
    dailyGoal: 2000,
    reminderInterval: 120,
    wakeTime: "07:00",
    sleepTime: "22:00",
    notificationsEnabled: true,
  };
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
      userSettings: defaultSettings,
      isFirstTime: true,
    });
  });
  