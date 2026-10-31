
export const calculateDailyBudget = (currentBudget, remainingDays) => {
        if (remainingDays === 0) return currentBudget * 1 // currentBudget is a string so doing an arithmetic operatin will turn it into a number

        const dailyBudget = currentBudget / remainingDays

        return dailyBudget
}