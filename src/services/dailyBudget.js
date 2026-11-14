
export const calculateDailyBudget = (currentBudget, remainingDays) => {
        if (remainingDays <= 0) return currentBudget * 1 // currentBudget is a string so doing an arithmetic operatin will turn it into a number
        if (currentBudget <= 0) return 0

        const dailyBudget = currentBudget / remainingDays

        return dailyBudget.toFixed(2) * 1 // .toFixed returns a string, so we convert it into a number
}