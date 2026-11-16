export const getHistoryData = () => {
        const history = JSON.parse(localStorage.getItem('dailyBudgetHistory'))

        if (!history) return []

        return history.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const saveDailyBudget = (currentTotalBudget, dailyBudget, starting) => {
        if (Number.isNaN(currentTotalBudget) || typeof currentTotalBudget !== 'number') throw new Error('Current total budget must be a number') // isNaN() checks actual NaN values, strings and numbers returns false
        if (Number.isNaN(dailyBudget) || typeof dailyBudget !== 'number') throw new Error('Daily budget must be a number') // typeof NaN returns 'number', so typeof Nan === 'number' returns true

        const startings = ['tomorrow', 'today']
        if (!startings.includes(starting)) throw new Error('Starting must only be either tomorrow or today')

        if (currentTotalBudget <= 0) currentTotalBudget = 0
        if (dailyBudget <= 0) dailyBudget = 0

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
                        if (record.date === formattedDate) return {...record, dailyBudget, currentTotalBudget}
                        return record
                })

                localStorage.setItem('dailyBudgetHistory', JSON.stringify(updatedPreviousRecord))
                return
        }

        previousRecords.push({currentTotalBudget, dailyBudget, date: formattedDate}) // push only when the date is not recorded yet
        localStorage.setItem('dailyBudgetHistory', JSON.stringify(previousRecords))
}