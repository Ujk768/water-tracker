export interface UserSettings {
  dailyGoal: number;
  wakeTime: string;
  sleepTime: string;
  totalWaterIntake?: number;
  lastIntakeTime?: string;
  goalCompleted: boolean;
}
