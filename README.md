# 💧 Water Tracker Chrome Extension

Stay hydrated and healthy with this productivity-focused Chrome Extension. This tool helps users track their daily water intake, sends timely reminders, and ensures hydration goals are met throughout the day.

---

## 🚀 Features

### ✅ User Setup
- **Onboarding**: First-time users are prompted to set up their daily water goal, wake-up time, and sleep time.
- **Settings Page**: Users can edit their hydration preferences, including daily goal and notification frequency.

- **Onboarding Page**

- ![image](https://github.com/user-attachments/assets/66b364f8-b925-48d1-b39f-a6aad0f0fefe)

**Define User goals**
![image](https://github.com/user-attachments/assets/2b850901-ff5d-4399-8395-fae5e087f1eb)


---

### 🔔 Smart Reminders
- **Hourly Notifications**: Sends a reminder every hour by default during the user’s active hours.
- **Adaptive Delay**: If the user drinks water twice in one cycle, the next reminder is delayed by 2 hours.
- **Alarm Management**: Uses Chrome Alarms API to create and manage notification cycles based on user actions.

---

### 📈 Hydration Tracking
- **Hourly Water Goal Calculation**: Automatically calculates how much water to drink each hour based on wake/sleep time and daily goal.
- **Live Tracking**: The popup displays real-time progress (e.g., `800/2000ml`) and a visual indicator (circular progress bar).
- **Persistent State**: Total water intake is saved in local storage and updated after every drink.


 **Track User Progress**
  
![image](https://github.com/user-attachments/assets/57c6edb6-810f-4951-bdd5-a4da655c5f17)


**Notifications to remind and update User Actions**
![image](https://github.com/user-attachments/assets/4754343f-d374-4968-8183-bdb9d0518ce2)

---

### 🛠️ Background Script Logic
- **Initialization**: Sets up default values on extension install.
- **Notification Dispatch**: Displays hydration or settings success messages based on user actions.
- **Data Persistence**: Stores user settings, water intake, and drink count cycle across popup and background scripts.

---

### 📦 Technologies Used
- **React + TypeScript** for the frontend popup UI and settings page.
- **SCSS** for styling the components.
- **Chrome Extensions APIs**: Storage, Alarms, Notifications, Runtime messaging.

---

## 📸 UI Preview

_Images coming soon..._

---

## 📌 Setup Instructions

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run build` to generate the extension build.
4. Go to `chrome://extensions`, enable "Developer Mode", and load the `dist/` folder as an unpacked extension.

---

## 🧠 Future Enhancements

- Analytics & history chart for daily/weekly intake.
- Cloud sync and login with Google.
- Custom notification tones and messages.
- Smart insights based on user habits.

---

## ✍️ Author

Utkarsh Kanade

---

