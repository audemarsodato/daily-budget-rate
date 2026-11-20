
export const calculateDailyBudget = (currentBudget, remainingDays) => {
        if (remainingDays <= 0) return currentBudget * 1 // currentBudget is a string so doing an arithmetic operatin will turn it into a number
        if (currentBudget <= 0) return 0

        const dailyBudget = currentBudget / remainingDays

        const reversedCurrentBudget = dailyBudget * remainingDays

        // return dailyBudget.toFixed(2) * 1 // .toFixed returns a string, so we convert it into a number
        return Number(dailyBudget.toFixed(2))
}

export const calculateAverageIncrease = (dailyBudgets) => {
        if (!Array.isArray(dailyBudgets)) throw new Error('Daily budgets must be an array of daily budget')
        if (dailyBudgets.some(budget => Number.isNaN(budget) || typeof budget !== 'number')) throw new Error('All daily budget in the array must be a number')
        if (dailyBudgets.length <= 1) return 0

        let sumOfIncrease = 0
        for (let i = 1; i < dailyBudgets.length; i++) {
                const currentDailyBudget = dailyBudgets[i]
                const previousDailyBudget = dailyBudgets[i - 1]

                sumOfIncrease += currentDailyBudget - previousDailyBudget
        }

        const averageIncrease = sumOfIncrease / (dailyBudgets.length - 1)

        return Number(averageIncrease.toFixed(2))
}

export const calculateAverageIncreaseRate = (dailyBudgets) => {
        if (!Array.isArray(dailyBudgets)) throw new Error('Daily budgets must be an array of daily budget')
        if (dailyBudgets.some(budget => Number.isNaN(budget) || typeof budget !== 'number')) throw new Error('All daily budget in the array must be a number')
        if (dailyBudgets.length <= 1) return 0

        let sumOfIncreaseRate = 0
        for (let i = 1; i < dailyBudgets.length; i++) {
                const currentDailyBudget = dailyBudgets[i]
                const previousDailyBudget = dailyBudgets[i - 1]

                sumOfIncreaseRate += ((currentDailyBudget - previousDailyBudget) / previousDailyBudget)
        }

        const averageIncreaseRate = (sumOfIncreaseRate / (dailyBudgets.length - 1)) * 100

        return Number(averageIncreaseRate.toFixed(2))
}

export const calculateAverageDailyExpense = (totalBudgets) => {
        if (!Array.isArray(totalBudgets)) throw new Error('Total budgets must be an array of daily budget')
        if (totalBudgets.some(budget => Number.isNaN(budget) || typeof budget !== 'number')) throw new Error('All total budget in the array must be a number')
        if (totalBudgets.length <= 1) return 0

        // const dailyExpenses = []
        let totalDailyExpenses = 0
        for (let i = 1; i < totalBudgets.length; i++) {
                const currentTotalBudget = totalBudgets[i]
                const previousTotalBudget = totalBudgets[i - 1]
                // const expense = currentTotalBudget - previousTotalBudget
        
                totalDailyExpenses += previousTotalBudget - currentTotalBudget
        }

        const averageDailyExpense = totalDailyExpenses / (totalBudgets.length - 1)

        return Number(averageDailyExpense.toFixed(2))
}