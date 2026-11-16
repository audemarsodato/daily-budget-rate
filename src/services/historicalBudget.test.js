import { describe, it, expect, vi } from "vitest"
import { getHistoryData, saveDailyBudget } from "./historicalBudget"

const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn()
}

vi.stubGlobal('localStorage', localStorageMock)

describe('history getHistory', () => {
        it('returns an empty array when fails to find dailyBudgetHistory', () => {
                localStorage.getItem.mockReturnValue(null) // Assume that local storage failed to find the key

                expect(getHistoryData()).toEqual([])
        })

        it('return an object sorted by date in descending order', () => {
                localStorage.getItem.mockReturnValue(JSON.stringify([
                        { date: 'Nov 17, 2026', dailyBudget: 180, totalCurrenBudget: 3800 },
                        { date: 'Nov 15, 2026', dailyBudget: 200, totalCurrenBudget: 4000 },
                        { date: 'Nov 16, 2026', dailyBudget: 190, totalCurrenBudget: 3900 }
                ]))
                
                const expectedDate = [
                        'Nov 15, 2026',
                        'Nov 16, 2026',
                        'Nov 17, 2026'
                ]

                expect(getHistoryData().map(data => data.date)).toEqual(expectedDate)
        })
})

describe('history saveDailyBudget', () => {
        it('throws an error when dailyBudget is string', () => {
                expect(() => saveDailyBudget(5000, 'im a string', 'today')).toThrow(/Daily budget must be a number/i)
        })

        it('throws an error when totalBudget is string', () => {
                expect(() => saveDailyBudget('im a string', 200, 'today')).toThrow(/total budget must be a number/i)
        })
        
        it('throws an error when starting is not tomorrow or today', () => {
                expect(() => saveDailyBudget(5000, 200, 'yesterday')).toThrow(/Starting must only be either tomorrow or today/i)
                expect(() => saveDailyBudget(5000, 200, 'next day')).toThrow(/Starting must only be either tomorrow or today/i)
        })
})