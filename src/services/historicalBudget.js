export const getHistoryData = () => {
        const history = JSON.parse(localStorage.getItem('dailyBudgetHistory'))

        if (!history) return []

        return history.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const saveDailyBudget = (currentTotalBudget, dailyBudget, starting) => {
        if (currentTotalBudget * 1 === 0) currentTotalBudget = 0

        if (!dailyBudget) dailyBudget = 0

        currentTotalBudget *= 1 // turns string budget into a number data type, current total budget * 1

        const date = new Date()

        if (starting === 'tomorrow') date.setDate(date.getDate() + 1)

        const formattedDate = date.toLocaleDateString('en-US', {
                month:'short',
                day: 'numeric',
                year: 'numeric'
        })

        const previousRecords = getHistoryData()

        if (previousRecords.some(record => record.date === formattedDate)) { // if previous record has the date, then we update that data
                const updatedPreviousRecord = previousRecords.map(record => {
                        if (record.date === formattedDate) {
                                return {...record, dailyBudget, currentTotalBudget}
                        }
                        return record
                })

                localStorage.setItem('dailyBudgetHistory', JSON.stringify(updatedPreviousRecord))
                return
        }

        previousRecords.push({currentTotalBudget, dailyBudget, date: formattedDate}) // push only when the date is not recorded yet

        localStorage.setItem('dailyBudgetHistory', JSON.stringify(previousRecords))
}