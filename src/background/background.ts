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
    if (message.type === "SETTINGS_UPDATED") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "water-bottle.png",
        title: "✅ Settings Saved",
        message: "Your preferences have been saved successfully.",
        priority: 2,
      });
    }
  });
