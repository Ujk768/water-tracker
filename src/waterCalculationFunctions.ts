//function to caluclate hourly amount needed to achieve goal
export const calulateHourlyWaterIntake = (wakeTime: string, sleepTime: string, dailyGoal: number)=>{
    const wakeTimeDate = new Date(`1970-01-01T${wakeTime}:00`);
    const sleepTimeDate = new Date(`1970-01-01T${sleepTime}:00`);
  
    // Calculate the total hours of wakefulness
    let totalHours = (sleepTimeDate.getTime() - wakeTimeDate.getTime()) / (1000 * 60 * 60);
  
    // If the sleep time is earlier than the wake time, it means the sleep time is on the next day
    if (totalHours < 0) {
      totalHours += 24;
    }
  
    // Calculate the hourly water intake
    const hourlyWaterIntake = dailyGoal / totalHours;
  
    return hourlyWaterIntake;
}

// function to calcualte remaining goal afetr obtaining current goal completed
export function calculateRemainingGoal(dailyGoal: number, totalWaterIntake: number) {
    return dailyGoal - totalWaterIntake;
}


